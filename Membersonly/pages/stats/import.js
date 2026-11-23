import { CONFIGURATION } from "../../../squash/scripts/configuration.js";

const seasonFinishPoints = {
  1: 100,
  2: 80,
  3: 60,
  4: 50,
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const source = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n" || character === "\r") {
      if (character === "\r" && source[index + 1] === "\n") index += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function columnIndex(column) {
  return column.toUpperCase().charCodeAt(0) - 65;
}

function numericValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function placeBonus(place, bonuses = seasonFinishPoints) {
  if (place >= 1 && place <= 4) return bonuses[place];
  return 0;
}

function calculateCompetitionPoints(competitionId, record) {
  if (competitionId === "peteroberts") {
    const place = numericValue(record.place);
    const placePoints =
      place === 1
        ? 250
        : place === 2
          ? 100
          : place === 3
            ? 75
            : place === 4
              ? 60
              : place === 5
                ? 50
                : place <= 10 && place > 0
                  ? 25
                  : place <= 25 && place > 0
                    ? 10
                    : place <= 50 && place > 0
                      ? 5
                      : 0;
    return (
      numericValue(record.wins) * 5 +
      numericValue(record.weeklyWins) * 10 +
      numericValue(record.runnersUp) * 20 +
      numericValue(record.weeks) * 2 +
      placePoints
    );
  }

  if (competitionId === "boxleagues") {
    const highBox = numericValue(record.highBox);
    return (
      numericValue(record.seasons) * 3 +
      numericValue(record.played) +
      numericValue(record.won) * 3 +
      numericValue(record.points) * 5 +
      numericValue(record.leagueChampions) * 100 +
      (highBox > 0 ? Math.max(0, 50 - (highBox - 1) * 5) : 0)
    );
  }

  // Match the historic calculator; the SLTC source labels this column "points".
  const score = numericValue(record.score);
  const multiplier = competitionId === "juniorclubnight" ? 1 : 3;
  return score * multiplier + placeBonus(numericValue(record.place));
}

function calculateLevel(totalPoints) {
  let level = 1;
  let pointsNeeded = 100;
  let increase = 100;

  while (totalPoints >= pointsNeeded) {
    level += 1;
    increase += 10;
    pointsNeeded += increase;
  }

  return level;
}

async function fetchSeasonRows(competition, season) {
  const url = new URL(
    `https://docs.google.com/spreadsheets/d/${competition.spreadsheetId}/gviz/tq`,
  );
  url.searchParams.set("tqx", "out:csv");
  url.searchParams.set("gid", season.gid);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Could not read the ${competition.id} ${season.season} spreadsheet tab (HTTP ${response.status}).`,
    );
  }

  const text = await response.text();
  if (/^\s*</.test(text)) {
    throw new Error(
      `Google returned a web page instead of CSV for ${competition.id} ${season.season}.`,
    );
  }
  return parseCsv(text);
}

export async function buildCompetitionImport() {
  const statRows = [];
  const players = new Map();
  let sheetCount = 0;

  for (const competition of CONFIGURATION.competitions) {
    for (const season of competition.seasons) {
      const rows = await fetchSeasonRows(competition, season);
      sheetCount += 1;

      for (const row of rows.slice(competition.startRow - 1)) {
        const record = Object.fromEntries(
          Object.entries(competition.columns).map(([field, column]) => [
            field,
            String(row[columnIndex(column)] ?? "").trim(),
          ]),
        );
        const playerName = record.name?.trim();
        if (!playerName) continue;

        const playerKey = playerName.toLowerCase();
        const recordPoints = calculateCompetitionPoints(
          competition.id,
          record,
        );
        const details = { ...record };
        delete details.name;

        statRows.push({
          player_key: playerKey,
          player_name: playerName,
          competition: competition.id,
          season: season.season,
          points: recordPoints,
          details,
        });

        const player = players.get(playerKey) || {
          totalPoints: 0,
          name: playerName,
        };
        player.totalPoints += recordPoints;
        players.set(playerKey, player);
      }
    }
  }

  const orderedPlayers = [...players.entries()].sort(
    (left, right) => right[1].totalPoints - left[1].totalPoints,
  );
  let rank = 0;
  let previousPoints = null;
  const summaryRows = orderedPlayers.map(([playerKey, player], index) => {
    if (player.totalPoints !== previousPoints) rank = index + 1;
    previousPoints = player.totalPoints;
    return {
      player_key: playerKey,
      level: calculateLevel(player.totalPoints),
      total_points: player.totalPoints,
      rank,
    };
  });

  return { statRows, summaryRows, sheetCount };
}

export async function importCompetitionData(supabase, onProgress = () => {}) {
  onProgress("Reading the historic competition spreadsheets…");
  const { statRows, summaryRows, sheetCount } = await buildCompetitionImport();

  if (!statRows.length || !summaryRows.length) {
    throw new Error("No competition records were found. Existing stats were not changed.");
  }

  onProgress(
    `Saving ${statRows.length.toLocaleString()} results across ${sheetCount} spreadsheet tabs…`,
  );
  const { error } = await supabase.rpc("admin_replace_competition_data", {
    stat_rows: statRows,
    summary_rows: summaryRows,
  });

  if (error) {
    console.error("Competition data import failed:", error.message);
    const errorCode = error.code ? ` (${error.code})` : "";
    throw new Error(
      `The spreadsheet data was read, but Supabase could not save it${errorCode}: ${error.message}`,
    );
  }

  return {
    resultCount: statRows.length,
    playerCount: summaryRows.length,
    sheetCount,
  };
}

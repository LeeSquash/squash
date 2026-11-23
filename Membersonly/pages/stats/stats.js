import { importCompetitionData } from "./import.js";

const pageCompetitionIds = {
  "box-leagues": "boxleagues",
  "generation-cup": "generationcup",
  "junior-handicap": "juniorclubnight",
  "racketball-handicap": "racketballclubnight",
  "squash-levels-team-challenge": "sltc",
  "wednesday-handicap": "peteroberts",
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString() : "—";
}

function formatPoints(value) {
  return formatNumber(value);
}

async function loadView(supabase, view, select = "*") {
  const allRows = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase
      .from(view)
      .select(select)
      .range(offset, offset + pageSize - 1);
    if (error) {
      console.error(`${view} load failed:`, error.message);
      throw new Error("Competition information could not be loaded.");
    }
    allRows.push(...(data || []));
    if (!data || data.length < pageSize) break;
  }
  return allRows;
}

function renderError(message) {
  return `
    <section class="member-panel">
      <p class="member-error">${escapeHtml(message)}</p>
    </section>
  `;
}

function renderTable(rows, headings, rowValues) {
  if (!rows.length) {
    return '<p class="member-copy">There are no results for this page yet.</p>';
  }

  return `
    <div class="table-wrap">
      <table class="member-table">
        <thead><tr>${headings.map((heading) => `<th scope="col">${escapeHtml(heading)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>${rowValues(row)
                  .map((value) => `<td>${escapeHtml(value)}</td>`)
                  .join("")}</tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderStatDetails(details) {
  if (!details || typeof details !== "object") return "";
  const entries = Object.entries(details).filter(([, value]) => value !== "");
  if (!entries.length) return "";
  const labels = {
    eventsPlayed: "Events played",
    highBox: "Highest box",
    leagueChampions: "League championships",
    matchesPlayed: "Matches played",
    runnersUp: "Runners-up",
    weeklyWins: "Weekly wins",
    weeks: "Weeks played",
    won: "Matches won",
  };
  return `
    <details class="stat-details">
      <summary>View result details</summary>
      <dl>
        ${entries
          .map(
            ([label, value]) => `
              <div><dt>${escapeHtml(labels[label] || label)}</dt><dd>${escapeHtml(value)}</dd></div>
            `,
          )
          .join("")}
      </dl>
    </details>
  `;
}

function renderHandicapTable(
  rows,
  columns,
  defaultSort = "score",
  defaultDirection = "desc",
  aggregateAllSeasons = false,
) {
  const getValues = (row) => ({
    season: row.season,
    place: row.details?.place,
    player: row.player_name,
    score: row.details?.score,
    games: row.details?.games,
    wins: row.details?.wins,
    weeklyWins: row.details?.weeklyWins,
    runnersUp: row.details?.runnersUp,
    weeks: row.details?.weeks,
  });
  const sortType = columns.find(([key]) => key === defaultSort)?.[2];
  const sortedRows = [...rows].sort((left, right) => {
    const leftValues = getValues(left);
    const rightValues = getValues(right);
    let comparison =
      sortType === "number"
        ? Number(leftValues[defaultSort] || 0) -
          Number(rightValues[defaultSort] || 0)
        : String(leftValues[defaultSort] || "").localeCompare(
            String(rightValues[defaultSort] || ""),
            undefined,
            { numeric: true, sensitivity: "base" },
          );
    if (defaultDirection === "desc") comparison *= -1;
    return (
      right.season.localeCompare(left.season) ||
      comparison ||
      Number(leftValues.place || 9999) - Number(rightValues.place || 9999) ||
      left.player_name.localeCompare(right.player_name)
    );
  });

  return `
    <div class="table-wrap">
      <table id="competition-results-table" class="member-table" data-default-sort="${defaultSort}" data-default-direction="${defaultDirection}" data-aggregate-all-seasons="${aggregateAllSeasons}">
        <thead><tr>
          ${columns
            .map(
              ([key, label, type]) => `
                <th scope="col" data-sort-column="${key}" data-sort-type="${type}" aria-sort="${key === defaultSort ? (defaultDirection === "desc" ? "descending" : "ascending") : "none"}">
                  <button class="stats-sort-button" type="button" data-sort-key="${key}" data-sort-type="${type}" aria-label="Sort by ${label}">
                    ${label}<span aria-hidden="true">${key === defaultSort ? (defaultDirection === "desc" ? " ↓" : " ↑") : ""}</span>
                  </button>
                </th>
              `,
            )
            .join("")}
        </tr></thead>
        <tbody>
          ${sortedRows
            .map((row) => {
              const values = getValues(row);

              return `
                <tr
                  ${columns
                    .map(
                      ([key, , type]) =>
                        `data-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}="${escapeHtml(type === "number" ? Number(values[key]) || 0 : key === "player" ? String(values[key] || "").toLowerCase() : values[key])}"`,
                    )
                    .join(" ")}
                >
                  ${columns
                    .map(([key]) =>
                      `<td>${escapeHtml(values[key] === "" || values[key] === null || values[key] === undefined ? "—" : values[key])}</td>`,
                    )
                    .join("")}
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCompetitionRows(rows, isWednesdayHandicap = false) {
  const seasons = [...new Set(rows.map((row) => row.season))]
    .filter(Boolean)
    .sort((left, right) => right.localeCompare(left));
  const recentSeasonDefault =
    isWednesdayHandicap || rows[0]?.competition_id === "juniorclubnight";
  const sortedRows = [...rows].sort(
    (left, right) =>
      right.season.localeCompare(left.season) ||
      Number(left.details?.place || 9999) -
        Number(right.details?.place || 9999) ||
      String(left.player_name).localeCompare(String(right.player_name)),
  );

  return `
    <section class="stats-results">
      <div class="stats-page-heading">
        <div>
          <p class="member-eyebrow">MEMBER STATS</p>
          <h1>${escapeHtml(rows[0]?.competition || "Competition")}</h1>
          <p class="member-copy">
            Browse current and historic results. Choose a season to narrow the
            table, or search for a player.
          </p>
        </div>
        <span class="stats-count">${rows.length.toLocaleString()} results</span>
      </div>
      <div class="member-panel competition-panel">
        <div class="stats-controls">
          <label>
            <span>Season</span>
            <select id="stats-season-filter">
              <option value="" ${recentSeasonDefault ? "" : "selected"}>All seasons</option>
              ${seasons.map((season, index) => `<option value="${escapeHtml(season)}" ${recentSeasonDefault && index === 0 ? "selected" : ""}>${escapeHtml(season)}</option>`).join("")}
            </select>
          </label>
          <label class="stats-search">
            <span>Find a player</span>
            <input id="stats-player-filter" type="search" placeholder="Type a name" autocomplete="off" />
          </label>
        </div>
        ${
          sortedRows.length
            ? isWednesdayHandicap
              ? renderHandicapTable(rows, [
                  ["season", "Season", "text"],
                  ["place", "Place", "number"],
                  ["player", "Player", "text"],
                  ["score", "Score", "number"],
                  ["games", "Games played", "number"],
                  ["wins", "Games won", "number"],
                  ["weeklyWins", "1st places", "number"],
                  ["runnersUp", "2nd places", "number"],
                  ["weeks", "Weeks played", "number"],
                ], "score", "desc", true)
              : rows[0]?.competition_id === "juniorclubnight"
                ? renderHandicapTable(
                    rows,
                    [
                      ["season", "Season", "text"],
                      ["place", "Place", "number"],
                      ["player", "Player", "text"],
                      ["score", "Score", "number"],
                      ["weeks", "Weeks played", "number"],
                    ],
                    "place",
                    "asc",
                    true,
                  )
              : `<div class="table-wrap">
                <table id="competition-results-table" class="member-table">
                  <thead><tr>
                    <th scope="col">Season</th>
                    <th scope="col">Place</th>
                    <th scope="col">Player</th>
                    <th scope="col">Website points</th>
                    <th scope="col">Result details</th>
                  </tr></thead>
                  <tbody>
                    ${sortedRows
                      .map(
                        (row) => `
                          <tr data-season="${escapeHtml(row.season)}" data-player="${escapeHtml(row.player_name.toLowerCase())}">
                            <td>${escapeHtml(row.season)}</td>
                            <td>${escapeHtml(row.details?.place || "—")}</td>
                            <td>${escapeHtml(row.player_name)}</td>
                            <td>${formatPoints(row.points)}</td>
                            <td>${renderStatDetails(row.details)}</td>
                          </tr>
                        `,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>`
            : '<p class="member-copy">There are no results for this competition yet.</p>'
        }
        <p id="stats-filter-empty" class="member-copy" hidden>No results match these filters.</p>
      </div>
      <p class="member-note">
        If a member has chosen to hide their name, their results are shown as
        “Anonymous player.” In the combined all-seasons view, those rows stay
        separate because their names are hidden.
      </p>
    </section>
  `;
}

function renderOverview(stats, leaderboard) {
  const competitions = new Set(stats.map((row) => row.competition_id));
  const seasons = new Set(stats.map((row) => row.season));
  const recent = [...stats]
    .sort((left, right) => right.season.localeCompare(left.season))
    .slice(0, 10);

  return `
    <section class="stats-results">
      <div class="stats-page-heading">
        <div>
          <p class="member-eyebrow">THE COMMUNITY SCOREBOARD</p>
          <h1>Competition stats</h1>
          <p class="member-copy">
            Competition results and player progress from the historic squash
            community records.
          </p>
        </div>
      </div>
      <div class="stats-summary-grid">
        <article class="member-panel stats-summary-card">
          <span>RESULTS</span><strong>${stats.length.toLocaleString()}</strong>
          <small>Available to signed-in members</small>
        </article>
        <article class="member-panel stats-summary-card">
          <span>COMPETITIONS</span><strong>${competitions.size.toLocaleString()}</strong>
          <small>With imported results</small>
        </article>
        <article class="member-panel stats-summary-card">
          <span>PLAYERS</span><strong>${leaderboard.length.toLocaleString()}</strong>
          <small>On the points leaderboard</small>
        </article>
      </div>
      ${
        recent.length
          ? `<div class="member-panel stats-table-panel">
               <div class="stats-section-heading"><h2>Recent results</h2><span>${seasons.size} seasons</span></div>
               ${renderTable(
                 recent,
                 ["Season", "Competition", "Player", "Points"],
                 (row) => [
                   row.season,
                   row.competition,
                   row.player_name,
                   formatPoints(row.points),
                 ],
               )}
             </div>`
          : `<div class="stats-empty">
               <span class="stats-empty-mark" aria-hidden="true">01</span>
               <h2>Competition results are ready to import</h2>
               <p>Historic spreadsheet results will appear here after an administrator updates the member database.</p>
             </div>`
      }
      <p class="member-note">
        The member site displays imported results using each member’s name-sharing
        choice. The original Google spreadsheets are separately published and
        may remain accessible outside this site until their sharing settings
        are changed.
      </p>
    </section>
  `;
}

async function renderLeaderboard(supabase) {
  const leaderboard = await loadView(supabase, "member_leaderboard");
  const rows = [...leaderboard].sort(
    (left, right) => Number(left.rank) - Number(right.rank),
  );
  return `
    <section class="stats-results">
      <div class="stats-page-heading">
        <div>
          <p class="member-eyebrow">COMMUNITY SCOREBOARD</p>
          <h1>Leaderboard</h1>
          <p class="member-copy">Overall points, level, and rank from the historic competition points system.</p>
        </div>
        <span class="stats-count">${rows.length.toLocaleString()} players</span>
      </div>
      <div class="member-panel stats-table-panel">
        ${renderTable(
          rows,
          ["Rank", "Player", "Level", "Total points"],
          (row) => [
            row.rank === null ? "—" : `#${row.rank}`,
            row.player_name,
            row.level,
            formatPoints(row.total_points),
          ],
        )}
      </div>
      <p class="member-note">
        Members who hide their name remain on the leaderboard as “Anonymous
        player”; their results and points are not removed.
      </p>
    </section>
  `;
}

async function renderProfiles(supabase) {
  const profiles = await loadView(supabase, "member_player_profiles");
  const profileCards = profiles
    .sort((left, right) => Number(left.rank) - Number(right.rank))
    .map((profile) => {
      const byCompetition = new Map();
      (profile.results || []).forEach((result) => {
        const seasons = byCompetition.get(result.competition) || [];
        seasons.push(result);
        byCompetition.set(result.competition, seasons);
      });

      return `
        <details class="profile-card">
          <summary>
            <span class="profile-rank">#${escapeHtml(profile.rank ?? "—")}</span>
            <span class="profile-player">
              <strong>${escapeHtml(profile.player_name)}</strong>
              <small>Level ${escapeHtml(profile.level)} · ${formatPoints(profile.total_points)} points</small>
            </span>
            <span class="profile-open" aria-hidden="true">＋</span>
          </summary>
          <div class="profile-results">
            ${
              byCompetition.size
                ? [...byCompetition.entries()]
                    .map(
                      ([competition, competitionResults]) => `
                        <section>
                          <h3>${escapeHtml(competition)}</h3>
                          ${renderTable(
                            competitionResults,
                            ["Season", "Place", "Points"],
                            (result) => [
                              result.season,
                              result.details?.place || "—",
                              formatPoints(result.points),
                            ],
                          )}
                        </section>
                      `,
                    )
                    .join("")
                : '<p class="member-copy">No competition history is connected yet.</p>'
            }
          </div>
        </details>
      `;
    })
    .join("");

  return `
    <section class="stats-results">
      <div class="stats-page-heading">
        <div>
          <p class="member-eyebrow">PLAYER DIRECTORY</p>
          <h1>Player Profiles</h1>
          <p class="member-copy">Explore the history and progress of players who have chosen to show their name.</p>
        </div>
        <span class="stats-count">${profiles.length.toLocaleString()} profiles</span>
      </div>
      ${
        profileCards
          ? `<div class="profile-directory">${profileCards}</div>`
          : `<div class="stats-empty">
               <span class="stats-empty-mark" aria-hidden="true">03</span>
               <h2>Player profiles will appear here</h2>
               <p>Profiles are shown after the historic competition data is imported and a linked member has chosen to show their name.</p>
             </div>`
      }
    </section>
  `;
}

export async function renderStatsPage(supabase, page) {
  try {
    if (page.id === "junior-squash-camps") {
      return `
        <section class="stats-results">
          <div class="stats-page-heading">
            <div>
              <p class="member-eyebrow">JUNIOR PROGRAMME</p>
              <h1>${escapeHtml(page.label)}</h1>
              <p class="member-copy">The historic page did not contain a spreadsheet or competition results.</p>
            </div>
          </div>
          <div class="stats-empty">
            <span class="stats-empty-mark" aria-hidden="true">JR</span>
            <h2>Information coming soon</h2>
            <p>This page is ready for camp dates, announcements, and junior squash camp information.</p>
          </div>
        </section>
      `;
    }

    if (page.id === "stats-overview") {
      const [stats, leaderboard] = await Promise.all([
        loadView(supabase, "member_competition_stats"),
        loadView(supabase, "member_leaderboard"),
      ]);
      return renderOverview(stats, leaderboard);
    }

    if (page.id === "leaderboard") {
      return await renderLeaderboard(supabase);
    }

    if (page.id === "player-profiles") {
      return await renderProfiles(supabase);
    }

    const rows = await loadView(supabase, "member_competition_stats");
    const competitionRows = rows.filter(
      (row) => row.competition_id === pageCompetitionIds[page.id],
    );
    if (!competitionRows.length) {
      return `
        <section class="stats-results">
          <div class="stats-page-heading">
            <div>
              <p class="member-eyebrow">MEMBER STATS</p>
              <h1>${escapeHtml(page.label)}</h1>
              <p class="member-copy">This competition’s historic results have not been imported yet.</p>
            </div>
          </div>
          <div class="stats-empty">
            <span class="stats-empty-mark" aria-hidden="true">01</span>
            <h2>Results are being connected</h2>
            <p>Once imported, this page will show all seasons, competition placings, and player results from the historic spreadsheet.</p>
          </div>
        </section>
      `;
    }
    return renderCompetitionRows(
      competitionRows,
      page.id === "wednesday-handicap",
    );
  } catch (error) {
    return renderError(error.message);
  }
}

export function connectStatsPageControls(supabase, onImportCompleted) {
  const importButton = document.querySelector("#import-stats-button");
  if (!importButton) return;

  importButton.addEventListener("click", async () => {
    const status = document.querySelector("#import-stats-status");
    importButton.disabled = true;
    try {
      const result = await importCompetitionData(supabase, (message) => {
        status.textContent = message;
      });
      const completionMessage =
        `Updated ${result.resultCount.toLocaleString()} results for ${result.playerCount.toLocaleString()} players from ${result.sheetCount} spreadsheet tabs.`;
      await onImportCompleted();
      const refreshedStatus = document.querySelector("#import-stats-status");
      if (refreshedStatus) refreshedStatus.textContent = completionMessage;
    } catch (error) {
      status.textContent = error.message;
      console.error("Competition data update failed:", error);
    } finally {
      importButton.disabled = false;
    }
  });
}

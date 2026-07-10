// ========================================
// PETE ROBERTS DATA FETCHER
// Loads Pete Roberts Handicap seasons.
// This file only fetches data.
// Rendering is handled by profile.js.
// ========================================

const urlParams = new URLSearchParams(window.location.search);
const targetPlayer = urlParams.get("name");

window.targetPlayer = targetPlayer;
window.loadedCompetitions = window.loadedCompetitions || [];

const SHEET_ID = "1hWIT4Zz98lv6yGhKJ6zAPbGvQmt1Ty_dXLpmAA7px3M";

const SEASONS = [
    { season: "2026/27", gid: "177383862" },
    { season: "2025/26", gid: "609811392" },
    { season: "2024/25", gid: "1448332020" },
    { season: "2023/24", gid: "485201543" },
    { season: "2022/23", gid: "107467510" },
    { season: "2021/22", gid: "1805298759" },
    { season: "2019/20", gid: "2015501302" },
    { season: "2018/19", gid: "2106645708" },
    { season: "2017/18", gid: "1973356220" },
    { season: "2016/17", gid: "1294972098" },
    { season: "2015/16", gid: "1434091666" },
    { season: "2014/15", gid: "879316616" }
];

if (targetPlayer) {
    fetchAllSeasons();
} else {

    window.playerSeasons = [];

    window.loadedCompetitions.push("Pete Roberts Handicap");

    window.dispatchEvent(
        new Event("competitionLoaded")
    );

}


// ========================================
// Fetch all seasons
// ========================================

async function fetchAllSeasons() {

    const playerSeasons = [];

    try {

        const seasonRequests = SEASONS.map(async seasonInfo => {

            const csvURL =
                `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${seasonInfo.gid}`;

            const response = await fetch(csvURL);

            if (!response.ok) {

                console.warn(
                    "Could not load " + seasonInfo.season
                );

                return null;
            }

            const rawText = await response.text();

            const rows = parseCSV(rawText);

            const totalPlayers = rows.length - 2;

            for (let i = 1; i < rows.length; i++) {

                const columns = rows[i];

                if (!columns || columns.length < 8) {
                    continue;
                }

                const playerName = clean(columns[1]);

                if (playerName.toLowerCase() === targetPlayer.trim().toLowerCase()) {

                    return {

                        competition: "Pete Roberts Handicap",

                        season: seasonInfo.season,

                        place: clean(columns[0]),

                        games: clean(columns[2]),

                        wins: clean(columns[3]),

                        weeklyWins: clean(columns[4]),

                        runnersUp: clean(columns[5]),

                        weeks: clean(columns[6]),

                        score: clean(columns[7]),

                        totalPlayers: totalPlayers

                    };
                }
            }

            return null;

        });

        const results = await Promise.all(seasonRequests);

        results.forEach(result => {

            if (result) {
                playerSeasons.push(result);
            }

        });

        window.playerSeasons = playerSeasons;

        window.loadedCompetitions.push("Pete Roberts Handicap");

        window.dispatchEvent(
            new Event("competitionLoaded")
        );


    } catch(error) {

        console.error(
            "Database Error:",
            error
        );

        window.playerSeasons = [];

        window.loadedCompetitions.push("Pete Roberts Handicap");

        window.dispatchEvent(
            new Event("competitionLoaded")
        );

    }

}


// ========================================
// Clean CSV values
// ========================================

function clean(value) {

    return value
        ?.replace(/^"|"$/g, "")
        .trim()
        || "-";

}


// ========================================
// CSV Parser
// ========================================

function parseCSV(text) {

    const lines = text.split(/\r?\n/);

    return lines.map(line => {

        const result = [];

        let current = "";

        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {

            const char = line[i];

            if (char === '"') {

                inQuotes = !inQuotes;

            } else if (char === "," && !inQuotes) {

                result.push(current);

                current = "";

            } else {

                current += char;

            }

        }

        result.push(current);

        return result;

    });

}
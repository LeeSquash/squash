// ========================================
// PLAYER PROFILE DATA LOADER
// Loads every season for a player from Google Sheets
// ========================================

// Get player name from URL (?name=Dan Ngo)
const urlParams = new URLSearchParams(window.location.search);
const targetPlayer = urlParams.get("name");

// Spreadsheet ID
const SHEET_ID = "1hWIT4Zz98lv6yGhKJ6zAPbGvQmt1Ty_dXLpmAA7px3M";

// All seasons
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

// HTML Elements
const nameHeading = document.getElementById("player-name");
const statusMsg = document.getElementById("status-message");
const visualOutput = document.getElementById("visual-output");

// Check URL
if (!targetPlayer) {

    nameHeading.innerText = "No Player Selected";
    statusMsg.innerText = "❌ Missing URL Parameter";
    statusMsg.style.color = "red";

    visualOutput.innerHTML =
        "<p>Please add a player name to the URL. Example: <code>?name=Dan Ngo</code></p>";

} else {

    nameHeading.innerText = targetPlayer;
    fetchAllSeasons();

}

// ========================================
// Fetch every season
// ========================================

async function fetchAllSeasons() {

    const playerSeasons = [];

    try {

        for (const seasonInfo of SEASONS) {

            const csvURL =
                `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${seasonInfo.gid}`;

            const response = await fetch(csvURL);

            if (!response.ok) {
                console.warn(`Could not load ${seasonInfo.season}`);
                continue;
            }

            const rawText = await response.text();
            const rows = parseCSV(rawText);

            for (let i = 2; i < rows.length; i++) {

                const columns = rows[i];

                if (!columns || columns.length < 8)
                    continue;

                const playerName =
                    columns[1].replace(/^"|"$/g, "").trim();

                if (playerName.toLowerCase() === targetPlayer.trim().toLowerCase()) {

                    playerSeasons.push({

                        season: seasonInfo.season,
                        place: columns[0]?.replace(/^"|"$/g, "").trim() || "-",
                        games: columns[2]?.replace(/^"|"$/g, "").trim() || "0",
                        wins: columns[3]?.replace(/^"|"$/g, "").trim() || "0",
                        weeklyWins: columns[4]?.replace(/^"|"$/g, "").trim() || "0",
                        runnersUp: columns[5]?.replace(/^"|"$/g, "").trim() || "0",
                        weeks: columns[6]?.replace(/^"|"$/g, "").trim() || "0",
                        score: columns[7]?.replace(/^"|"$/g, "").trim() || "0"

                    });

                    break;
                }

            }

        }

        if (playerSeasons.length === 0) {

            statusMsg.innerText = "❌ Profile Record Missing";
            statusMsg.style.color = "red";

            visualOutput.innerHTML =
                `<p>No records were found for "${targetPlayer}".</p>`;

            return;

        }

        statusMsg.innerText =
            `✔ Loaded ${playerSeasons.length} Season${playerSeasons.length > 1 ? "s" : ""}`;

        statusMsg.style.color = "green";

        let html = "";

        for (const season of playerSeasons) {

            html += `
                <div class="career-box">

                    <h4>${season.season}</h4>

                    <div class="stat-line">
                        <strong>Final Standing:</strong>
                        <span class="stat-value">${season.place}</span>
                    </div>

                    <div class="stat-line">
                        <strong>Games Played:</strong>
                        <span class="stat-value">${season.games}</span>
                    </div>

                    <div class="stat-line">
                        <strong>Games Won:</strong>
                        <span class="stat-value">${season.wins}</span>
                    </div>

                    <div class="stat-line">
                        <strong>Weekly Wins:</strong>
                        <span class="stat-value">${season.weeklyWins}</span>
                    </div>

                    <div class="stat-line">
                        <strong>Runner Up Placements:</strong>
                        <span class="stat-value">${season.runnersUp}</span>
                    </div>

                    <div class="stat-line">
                        <strong>Weeks Attended:</strong>
                        <span class="stat-value">${season.weeks}</span>
                    </div>

                    <div class="stat-line">
                        <strong>Total Score:</strong>
                        <span class="stat-value">${season.score}</span>
                    </div>

                </div>
            `;

        }

        visualOutput.innerHTML = html;

    }
    catch (error) {

        console.error(error);

        statusMsg.innerText = "❌ Error Loading Profile";
        statusMsg.style.color = "red";

        visualOutput.innerHTML =
            "<p>There was a problem connecting to Google Sheets.</p>";

    }

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
// ========================================
// JUNIOR CLUBNIGHT DATA FETCHER
// Fetches Junior Clubnight data only.
// Rendering handled by profile.js.
// ========================================

window.loadedCompetitions = window.loadedCompetitions || [];

if (window.targetPlayer) {
    loadJuniorClubnight();
} else {

    window.juniorClubnight = [];

    window.loadedCompetitions.push("Junior Clubnight");

    window.dispatchEvent(
        new Event("competitionLoaded")
    );

}

async function loadJuniorClubnight() {

    const targetPlayer = window.targetPlayer;

    const SHEET_ID = "1JWFjiEYeyCIkVsyNfP3PKUyU7KxM_u2Ym1sr6hUw-Gg";

    const SEASONS = [
        { season: "2026/27", gid: "0" },
        { season: "2025/26", gid: "1494398203" },
        { season: "2024/25", gid: "505669054" }
    ];

    const playerRecords = [];

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

            const rows = parseCSV(await response.text());

            for (let i = 1; i < rows.length; i++) {

                const columns = rows[i];

                if (!columns || columns.length < 4) {
                    continue;
                }

                const playerName = clean(columns[1]);

                if (
                    playerName.toLowerCase() ===
                    targetPlayer.trim().toLowerCase()
                ) {

                    return {

                        competition: "Junior Clubnight",

                        season: seasonInfo.season,

                        place: clean(columns[0]),

                        name: playerName,

                        weeks: clean(columns[2]),

                        score: clean(columns[3])

                    };

                }

            }

            return null;

        });


        const results = await Promise.all(seasonRequests);


        results.forEach(result => {

            if (result) {
                playerRecords.push(result);
            }

        });


    } catch(error) {

        console.error(
            "Junior Clubnight Database Error:",
            error
        );

    }


    window.juniorClubnight = playerRecords;


    window.loadedCompetitions.push(
        "Junior Clubnight"
    );


    window.dispatchEvent(
        new Event("competitionLoaded")
    );

}


function clean(value) {

    return value
        ?.replace(/^"|"$/g, "")
        .trim()
        || "-";

}


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
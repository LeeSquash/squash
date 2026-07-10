// ========================================
// RACKETBALL CLUBNIGHT DATA FETCHER
// Fetches Racketball Clubnight data only.
// Rendering handled by profile.js.
// ========================================

loadRacketballClubnight();

async function loadRacketballClubnight() {

    const targetPlayer = window.targetPlayer;

    const SHEET_ID = "1ytJzurKWV262BRsDF0pyhai049veXIxgHlzPkDME4AE";

    const SEASONS = [
        { season: "2026/27", gid: "0" },
        { season: "2025/26", gid: "1530884915" }
    ];

    const playerRecords = [];

    try {

        const seasonRequests = SEASONS.map(async seasonInfo => {

            const csvURL =
                `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${seasonInfo.gid}`;

            const response = await fetch(csvURL);

            if (!response.ok) {

                console.warn("Could not load " + seasonInfo.season);

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

                        competition: "Racketball Clubnight",

                        season: seasonInfo.season,

                        place: clean(columns[0]),

                        name: playerName,

                        points: clean(columns[3])

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
            "Racketball Clubnight Database Error:",
            error
        );

    }


    window.racketballClubnight = playerRecords;


    window.loadedCompetitions =
        window.loadedCompetitions || [];


    window.loadedCompetitions.push(
        "Racketball Clubnight"
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

    return text.split(/\r?\n/).map(line => {

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
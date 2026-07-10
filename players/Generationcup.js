// ========================================
// GENERATION CUP DATA FETCHER
// Fetches Generation Cup data only.
// Rendering handled by profile.js.
// ========================================

loadGenerationCup();

async function loadGenerationCup() {

    const targetPlayer = window.targetPlayer;

    const SHEET_ID = "1HTUu_Kj4_gHketMSmYO7mIpUcTqYjEelX_ZSEX0UqMc";

    const SEASONS = [
        { season: "2026/27", gid: "865362237" },
        { season: "2025/26", gid: "978745522" },
        { season: "2024/25", gid: "193457107" }
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

                if (!columns || columns.length < 3) {
                    continue;
                }


                const playerName = clean(columns[1]);


                if (
                    playerName.toLowerCase() ===
                    targetPlayer.trim().toLowerCase()
                ) {

                    return {

                        competition: "Generation Cup",

                        season: seasonInfo.season,

                        place: clean(columns[0]),

                        name: playerName,

                        points: clean(columns[2])

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
            "Generation Cup Database Error:",
            error
        );

    }


    window.generationCup = playerRecords;


    window.loadedCompetitions =
        window.loadedCompetitions || [];


    window.loadedCompetitions.push(
        "Generation Cup"
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
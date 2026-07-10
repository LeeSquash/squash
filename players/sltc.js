// ========================================
// SLTC DATA FETCHER
// Fetches Squash Levels Team Challenge data only.
// Rendering handled by profile.js.
// ========================================

window.loadedCompetitions = window.loadedCompetitions || [];

if (window.targetPlayer) {
    loadSLTC();
} else {

    window.sltc = [];

    window.loadedCompetitions.push("SLTC");

    window.dispatchEvent(
        new Event("competitionLoaded")
    );

}


async function loadSLTC() {

    const targetPlayer = window.targetPlayer;

    const SHEET_ID =
        "1dWUO_n7Dx2qhQir7OgyC8jgzYuOAJAeTkwrCciFbEJc";


    const SEASONS = [
        { season: "2026/27", gid: "719618828" },
        { season: "2025/26", gid: "1608891651" },
        { season: "2024/25", gid: "1265524802" }
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

                return [];

            }


            const rows =
                parseCSV(await response.text());


            const seasonRecords = [];


            for (let i = 1; i < rows.length; i++) {


                const columns = rows[i];


                if (!columns || columns.length < 4) {
                    continue;
                }


                const playerName =
                    clean(columns[1]);


                if (
                    playerName.toLowerCase() ===
                    targetPlayer.trim().toLowerCase()
                ) {


                    seasonRecords.push({

                        competition:
                            "SLTC",

                        season:
                            seasonInfo.season,

                        place:
                            clean(columns[0]),

                        name:
                            playerName,

                        team:
                            clean(columns[2]),

                        points:
                            clean(columns[3])

                    });


                }

            }


            return seasonRecords;


        });


        const results =
            await Promise.all(seasonRequests);


        results.forEach(records => {

            records.forEach(record => {

                playerRecords.push(record);

            });

        });


    } catch(error) {

        console.error(
            "SLTC Database Error:",
            error
        );

    }


    window.sltc = playerRecords;


    window.loadedCompetitions.push(
        "SLTC"
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

    const lines =
        text.split(/\r?\n/);


    return lines.map(line => {


        const result = [];

        let current = "";

        let inQuotes = false;


        for (let i = 0; i < line.length; i++) {


            const char = line[i];


            if (char === '"') {

                inQuotes = !inQuotes;


            } else if (
                char === "," &&
                !inQuotes
            ) {

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
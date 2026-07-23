// ========================================
// DATABASE BUILDER
// Converts raw competition data into player database
// ========================================

import { fetchCompetitions } from "./fetchcompetitions.js";
import { CONFIGURATION } from "./configuration.js";
import fs from "fs";


async function buildDatabase() {

    const rawData = await fetchCompetitions();

    const database = {
        players: {}
    };


    for (const competition of CONFIGURATION.competitions) {

        const competitionData =
            rawData[competition.id] || [];


        competitionData.forEach(seasonData => {

            const rows = seasonData.rows;

            const startIndex =
                seasonData.startRow - 1;


            for (let i = startIndex; i < rows.length; i++) {

                const row = rows[i];

                const nameColumn =
                    columnNumber(
                        competition.columns.name
                    );


                const playerName =
                    clean(row[nameColumn]);


                if (!playerName) {
                    continue;
                }


                const playerKey =
                    playerName.toLowerCase();


                if (!database.players[playerKey]) {

                    database.players[playerKey] = {

                        name: playerName,

                        competitions: {}

                    };

                }


                if (
                    !database.players[playerKey]
                    .competitions[competition.id]
                ) {

                    database.players[playerKey]
                    .competitions[competition.id] = [];

                }


                const record = {

                    season: seasonData.season

                };


                Object.entries(competition.columns)
                .forEach(([field, column]) => {

                    record[field] =
                        clean(
                            row[columnNumber(column)]
                        );

                });


                database.players[playerKey]
                .competitions[competition.id]
                .push(record);

            }

        });

    }


    fs.writeFileSync(
        "./data/database.json",
        JSON.stringify(database, null, 2)
    );


    console.log(
        "Database created successfully"
    );

}


function columnNumber(letter) {

    return letter
        .toUpperCase()
        .charCodeAt(0) - 65;

}


function clean(value) {

    return value
        ?.replace(/^"|"$/g, "")
        .trim()
        || "";

}


buildDatabase();
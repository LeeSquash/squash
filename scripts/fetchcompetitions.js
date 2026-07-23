// ========================================
// COMPETITION DATA FETCHER
// Downloads all raw competition data
// ========================================

import { CONFIGURATION } from "./configuration.js";
import { parseCSV } from "./csvparser.js";

export async function fetchCompetitions() {

    const competitions = {};

    for (const competition of CONFIGURATION.competitions) {

        competitions[competition.id] = [];

        for (const season of competition.seasons) {

            const csvURL =
                `https://docs.google.com/spreadsheets/d/${competition.spreadsheetId}/gviz/tq?tqx=out:csv&gid=${season.gid}`;

            try {

                const response = await fetch(csvURL);

                if (!response.ok) {

                    console.warn(
                        `Could not load ${competition.id} ${season.season}`
                    );

                    continue;

                }

                const csvText = await response.text();

                const rows = parseCSV(csvText);

                competitions[competition.id].push({

                    season: season.season,

                    rows: rows,

                    startRow: competition.startRow,

                    columns: competition.columns

                });


            } catch(error) {

                console.error(
                    `Error loading ${competition.id} ${season.season}`,
                    error
                );

            }

        }

    }

    return competitions;

}
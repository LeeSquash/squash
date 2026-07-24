// ========================================
// PETE ROBERTS POINT CALCULATOR
// Calculates total and seasonal points
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";


export function calculatePeteRobertsPoints(records) {

    let totalPoints = 0;

    const seasonPoints = {};

    if (!records || records.length === 0) {

        return {
            total: 0,
            seasons: {}
        };

    }


    const rules = POINTS_CONFIGURATION.competitions.peteroberts.rules;
    const bonuses = POINTS_CONFIGURATION.competitions.peteroberts.seasonFinish;


    records.forEach(record => {

        let points = 0;


        points += (Number(record.wins) || 0) * rules.gamesWon;

        points += (Number(record.weeklyWins) || 0) * rules.weeklyWins;

        points += (Number(record.runnersUp) || 0) * rules.runnersUp;

        points += (Number(record.weeks) || 0) * rules.weeksPlayed;


        const place = Number(record.place) || 0;


        if (place === 1) points += bonuses[1];

        else if (place === 2) points += bonuses[2];

        else if (place === 3) points += bonuses[3];

        else if (place === 4) points += bonuses[4];

        else if (place === 5) points += bonuses[5];

        else if (place <= 10 && place > 0) points += bonuses.top10;

        else if (place <= 25 && place > 0) points += bonuses.top25;

        else if (place <= 50 && place > 0) points += bonuses.top50;


        totalPoints += points;


        const season = record.season;


        if (!seasonPoints[season]) {

            seasonPoints[season] = 0;

        }


        seasonPoints[season] += points;


    });


    return {

        total: totalPoints,

        seasons: seasonPoints

    };

}
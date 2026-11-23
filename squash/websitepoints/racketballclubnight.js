// ========================================
// RACKETBALL CLUBNIGHT POINT CALCULATOR
// Calculates total and seasonal points
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";


export function calculateRacketballClubnightPoints(records) {

    let totalPoints = 0;

    const seasonPoints = {};


    if (!records || records.length === 0) {

        return {
            total: 0,
            seasons: {}
        };

    }


    const rules = POINTS_CONFIGURATION.competitions.racketballclubnight.rules;
    const bonuses = POINTS_CONFIGURATION.competitions.racketballclubnight.seasonFinish;


    records.forEach(record => {

        let points = 0;


        const place = Number(record.place) || 0;


        points += (Number(record.score) || 0) * rules.pointsMultiplier;


        if (place === 1) points += bonuses[1];

        else if (place === 2) points += bonuses[2];

        else if (place === 3) points += bonuses[3];

        else if (place === 4) points += bonuses[4];


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
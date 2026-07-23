// ========================================
// GENERATION CUP POINT CALCULATOR
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";

export function calculateGenerationCupPoints(records) {

    let totalPoints = 0;

    if (!records || records.length === 0) return 0;

    const rules = POINTS_CONFIGURATION.competitions.generationcup.rules;
    const bonuses = POINTS_CONFIGURATION.competitions.generationcup.seasonFinish;

    records.forEach(record => {

        const place = Number(record.place) || 0;

        totalPoints += (Number(record.score) || 0) * rules.pointsMultiplier;

        if (place === 1) totalPoints += bonuses[1];
        else if (place === 2) totalPoints += bonuses[2];
        else if (place === 3) totalPoints += bonuses[3];
        else if (place === 4) totalPoints += bonuses[4];

    });

    return totalPoints;

}
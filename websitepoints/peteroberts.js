// ========================================
// PETE ROBERTS POINT CALCULATOR
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";

export function calculatePeteRobertsPoints(records) {

    let totalPoints = 0;

    if (!records || records.length === 0) return 0;

    const rules = POINTS_CONFIGURATION.competitions.peteroberts.rules;
    const bonuses = POINTS_CONFIGURATION.competitions.peteroberts.seasonFinish;

    records.forEach(record => {

        totalPoints += (Number(record.wins) || 0) * rules.gamesWon;
        totalPoints += (Number(record.weeklyWins) || 0) * rules.weeklyWins;
        totalPoints += (Number(record.runnersUp) || 0) * rules.runnersUp;
        totalPoints += (Number(record.weeks) || 0) * rules.weeksPlayed;

        const place = Number(record.place) || 0;

        if (place === 1) totalPoints += bonuses[1];
        else if (place === 2) totalPoints += bonuses[2];
        else if (place === 3) totalPoints += bonuses[3];
        else if (place === 4) totalPoints += bonuses[4];
        else if (place === 5) totalPoints += bonuses[5];
        else if (place <= 10 && place > 0) totalPoints += bonuses.top10;
        else if (place <= 25 && place > 0) totalPoints += bonuses.top25;
        else if (place <= 50 && place > 0) totalPoints += bonuses.top50;

    });

    return totalPoints;

}
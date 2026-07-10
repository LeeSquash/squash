// ========================================
// PLAYER POINTS CALCULATOR
// Calculates total points from all competitions
// ========================================

import { calculateSLTCPoints } from "./sltc.js";

export function calculatePlayerPoints() {

    let totalPoints = 0;

    const playerSeasons = window.playerSeasons || [];

    playerSeasons.forEach(season => {
        totalPoints += (Number(season.wins) || 0) * 5;
        totalPoints += (Number(season.weeklyWins) || 0) * 10;
        totalPoints += (Number(season.runnersUp) || 0) * 20;
        totalPoints += (Number(season.weeks) || 0) * 2;
    });

    const sltc = window.sltc || [];
    totalPoints += calculateSLTCPoints(sltc);

    return totalPoints;
}


// ========================================
// PLAYER LEVEL
// ========================================

export function calculatePlayerLevel(totalPoints) {

    let level = 1;

    while (totalPoints >= pointsRequiredForLevel(level + 1)) {
        level++;
    }

    return level;

}


function pointsRequiredForLevel(level) {

    if (level <= 1) return 0;

    let totalPoints = 0;

    for (let i = 2; i <= level; i++) {
        totalPoints += 90 + (i * 10);
    }

    return totalPoints;

}
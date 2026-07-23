// ========================================
// LEVEL CALCULATOR
// Converts total points into player level
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";

export function calculateLevel(totalPoints) {

    let level = POINTS_CONFIGURATION.levels.startingLevel;
    let pointsNeeded = POINTS_CONFIGURATION.levels.firstLevelUpPoints;
    let increase = POINTS_CONFIGURATION.levels.firstLevelUpPoints;

    while (totalPoints >= pointsNeeded) {
        level++;
        increase += POINTS_CONFIGURATION.levels.pointsIncreasePerLevel;
        pointsNeeded += increase;
    }

    return level;

}
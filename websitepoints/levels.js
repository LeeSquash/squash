// ========================================
// LEVEL CALCULATOR
// Converts total points into player level
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";


export function calculateLevel(totalPoints) {

    let level = POINTS_CONFIGURATION.levels.startingLevel;

    let pointsNeeded = POINTS_CONFIGURATION.levels.firstLevelUpPoints;

    let increase = POINTS_CONFIGURATION.levels.pointsIncreasePerLevel;


    while (totalPoints >= pointsNeeded) {

        level++;

        pointsNeeded += increase;

        increase += POINTS_CONFIGURATION.levels.pointsIncreasePerLevel;

    }


    return level;

}
// ========================================
// LEVEL CALCULATOR
// Converts total points into player level
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";

export function calculateLevel(totalPoints) {

    return getLevelData(totalPoints).level;

}


export function getLevelData(totalPoints) {

    let level = POINTS_CONFIGURATION.levels.startingLevel;

    let pointsNeeded = POINTS_CONFIGURATION.levels.firstLevelUpPoints;

    let increase = POINTS_CONFIGURATION.levels.firstLevelUpPoints;


    while (totalPoints >= pointsNeeded) {

        level++;

        increase += POINTS_CONFIGURATION.levels.pointsIncreasePerLevel;

        pointsNeeded += increase;

    }


    const previousLevelPoints =
        getPointsRequiredForLevel(level);


    const nextLevelPoints =
        pointsNeeded;


    const progressPoints =
        totalPoints - previousLevelPoints;


    const levelRange =
        nextLevelPoints - previousLevelPoints;


    const progress =
        levelRange > 0
            ? (progressPoints / levelRange) * 100
            : 100;


    return {

        level: level,

        currentPoints: totalPoints,

        pointsToNextLevel: nextLevelPoints,

        progress: Math.min(Math.round(progress), 100)

    };

}


function getPointsRequiredForLevel(level) {

    let points = 0;

    let increase = POINTS_CONFIGURATION.levels.firstLevelUpPoints;


    for (let i = 1; i < level; i++) {

        points += increase;

        increase += POINTS_CONFIGURATION.levels.pointsIncreasePerLevel;

    }


    return points;

}
// ========================================
// PETE ROBERTS POINT SYSTEM
// Handles Pete Roberts scoring rules
// ========================================

const PETE_ROBERTS_RULES = {

    seasonFinish: {
        1: 100,
        2: 80,
        3: 60,
        4: 50
    },

    gameWin: 5,
    weeklyWin: 10,
    runnerUp: 20,
    weekAttended: 2

};


// ========================================
// LEVEL SYSTEM
// ========================================

function pointsRequiredForLevel(level) {

    if (level <= 1) return 0;

    let totalPoints = 0;

    for (let i = 2; i <= level; i++) {
        totalPoints += 90 + (i * 10);
    }

    return totalPoints;

}


function calculateLevel(totalPoints) {

    let level = 1;

    while (totalPoints >= pointsRequiredForLevel(level + 1)) {
        level++;
    }

    return level;

}


// ========================================
// CALCULATE PETE ROBERTS POINTS
// Receives all Pete Roberts seasons
// ========================================

function calculatePeterRobertsPoints(playerSeasons) {

    let totalPoints = 0;

    playerSeasons.forEach(season => {

        totalPoints +=
            (Number(season.wins) || 0)
            *
            PETE_ROBERTS_RULES.gameWin;

        totalPoints +=
            (Number(season.weeklyWins) || 0)
            *
            PETE_ROBERTS_RULES.weeklyWin;

        totalPoints +=
            (Number(season.runnersUp) || 0)
            *
            PETE_ROBERTS_RULES.runnerUp;

        totalPoints +=
            (Number(season.weeks) || 0)
            *
            PETE_ROBERTS_RULES.weekAttended;

        const place = Number(season.place);

        if (PETE_ROBERTS_RULES.seasonFinish[place]) {

            totalPoints += PETE_ROBERTS_RULES.seasonFinish[place];

        }

    });

    return totalPoints;

}
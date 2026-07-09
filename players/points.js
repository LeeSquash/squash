// ========================================
// PLAYER POINTS AND LEVEL SYSTEM
// Handles scoring rules and player levels
// ========================================



// ========================================
// POINT VALUES
// Change these numbers to adjust scoring
// ========================================

const POINT_RULES = {


    // Tournament performance

    seasonFinish: {

        1: 100,     // 1st place
        2: 80,      // 2nd place
        3: 60,      // 3rd place
        4: 50

    },


    // Match statistics

    gameWin: 5,

    weeklyWin: 10,

    runnerUp: 20,


    // Participation

    weekAttended: 2,


};





// ========================================
// LEVEL SYSTEM
// Level 1 starts at zero points
//
// Level 2 = 100 points
// Level 3 = 210 points
// Level 4 = 330 points
//
// Each level requires 10 more points
// than the previous level
// ========================================


function pointsRequiredForLevel(level) {


    if (level <= 1) {

        return 0;

    }


    let totalPoints = 0;


    for (let i = 2; i <= level; i++) {


        totalPoints += 90 + (i * 10);


    }


    return totalPoints;

}





// ========================================
// Convert total points into player level
// ========================================


function calculateLevel(totalPoints) {


    let level = 1;


    while (
        totalPoints >= pointsRequiredForLevel(level + 1)
    ) {


        level++;

    }


    return level;

}





// ========================================
// Calculate points from one season
// ========================================


function calculatePlayerPoints(playerData) {


    let points = 0;



    // Add points for wins

    points +=
        (Number(playerData.wins) || 0)
        *
        POINT_RULES.gameWin;



    // Add weekly wins

    points +=
        (Number(playerData.weeklyWins) || 0)
        *
        POINT_RULES.weeklyWin;



    // Add runner ups

    points +=
        (Number(playerData.runnersUp) || 0)
        *
        POINT_RULES.runnerUp;



    // Add attendance

    points +=
        (Number(playerData.weeks) || 0)
        *
        POINT_RULES.weekAttended;



    return points;

}





// ========================================
// Calculate player's level from all seasons
// This is the function profile.js calls
// ========================================


function calculatePlayerLevel(playerSeasons) {


    let totalPoints = 0;



    playerSeasons.forEach(season => {


        totalPoints += calculatePlayerPoints(season);


    });



    return calculateLevel(totalPoints);

}
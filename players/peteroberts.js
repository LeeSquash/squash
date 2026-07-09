// ========================================
// PETE ROBERTS HANDICAP POINTS
// Calculates points earned from this competition only
// ========================================


// Change these values to adjust scoring
const PETE_ROBERTS_POINTS = {

    weekAttended: 5,

    gameWon: 2,

    weeklyWin: 25,

    runnerUp: 10

};


// ========================================
// Seasonal finish bonus
// ========================================

function getSeasonFinishPoints(place, totalPlayers) {

    const playersAbove = totalPlayers - place;

    let points = playersAbove * 5;


    if (place <= 50) points += 5;

    if (place <= 25) points += 10;

    if (place <= 10) points += 25;

    if (place <= 5) points += 50;


    switch(place) {

        case 4:
            points += 60;
            break;

        case 3:
            points += 75;
            break;

        case 2:
            points += 100;
            break;

        case 1:
            points += 250;
            break;

    }


    return points;

}


// ========================================
// Calculate Pete Roberts points
// ========================================

function calculatePeteRobertsPoints(season) {

    let points = 0;


    // Weekly performance

    points +=
        Number(season.weeks || 0)
        *
        PETE_ROBERTS_POINTS.weekAttended;


    points +=
        Number(season.wins || 0)
        *
        PETE_ROBERTS_POINTS.gameWon;


    points +=
        Number(season.weeklyWins || 0)
        *
        PETE_ROBERTS_POINTS.weeklyWin;


    points +=
        Number(season.runnersUp || 0)
        *
        PETE_ROBERTS_POINTS.runnerUp;



    // Seasonal finishing position

    points +=
        getSeasonFinishPoints(
            Number(season.place),
            Number(season.totalPlayers)
        );


    return points;

}
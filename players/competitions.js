// ========================================
// COMPETITIONS DATABASE
// ========================================
//
// This file only tells the website which
// competition fetchers exist.
//
// Each competition has its own file which
// handles:
// - Spreadsheet ID
// - Sheet GIDs
// - Column layout
// - Calculations
// - Data formatting
//
// To add a new competition:
// 1. Create a new competition file.
// 2. Add it to this list.
//
// ========================================


const COMPETITIONS = [

    {
        name: "Pete Roberts Handicap",

        loader: loadPeteRoberts

    },

    {
        name: "Junior Clubnight",

        loader: loadJuniorClubnight

    },
    // ========================================
    // Add future competitions below
    // ========================================

    /*
    {
        name: "Competition Name",

        loader: loadCompetitionName

    },
    */
];
   


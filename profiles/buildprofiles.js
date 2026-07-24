// ========================================
// PROFILE BUILDER
// Creates player profiles from database and leaderboard data
// ========================================

import fs from "fs";


const database = JSON.parse(
    fs.readFileSync("./data/database.json", "utf8")
);


const leaderboard = JSON.parse(
    fs.readFileSync("./data/leaderboard.json", "utf8")
);


const profiles = {};


const competitionNames = {

    peteroberts: "Wednesday Handicap",

    sltc: "SL Team Challenge",

    generationcup: "Generation Cup",

    juniorclubnight: "Junior Clubnight",

    racketballclubnight: "Racketball Clubnight"

};



Object.keys(database.players).forEach(playerKey => {


    const player = database.players[playerKey];


    const leaderboardEntry = leaderboard.find(
        item => item.name === player.name
    );


    const competitions = {};


    Object.keys(player.competitions).forEach(competition => {


        const pointsData =
            leaderboardEntry?.points?.breakdown?.[competition] ||
            {
                total: 0,
                seasons: {}
            };


        competitions[competition] = {

            name: competitionNames[competition] || competition,

            points: pointsData.total,

            seasons: pointsData.seasons,

            stats: player.competitions[competition]

        };


    });



    profiles[playerKey] = {


        name: player.name,


        summary: {


            level: leaderboardEntry
                ? leaderboardEntry.level
                : 1,


            points: leaderboardEntry
                ? leaderboardEntry.points.total
                : 0,


            rank: leaderboardEntry?.rank || null


        },


        trophies: [],


        achievements: [],


        competitions: competitions


    };


});



fs.writeFileSync(

    "./data/profiles.json",

    JSON.stringify(profiles, null, 2)

);


console.log("Profiles created successfully");
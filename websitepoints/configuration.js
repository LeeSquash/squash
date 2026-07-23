// ========================================
// WEBSITE POINTS CONFIGURATION
// Controls all points rules and level system
// ========================================

export const POINTS_CONFIGURATION = {

    levels: {

        startingLevel: 1,

        firstLevelUpPoints: 100,

        pointsIncreasePerLevel: 10

    },


    competitions: {

        peteroberts: {

            enabled: true,

            rules: {

                gamesWon: 5,
                weeklyWins: 10,
                runnersUp: 20,
                weeksPlayed: 2

            },

            seasonFinish: {

                1: 250,
                2: 100,
                3: 75,
                4: 60,
                5: 50,
                top10: 25,
                top25: 10,
                top50: 5

            }

        },


        sltc: {

            enabled: true,

            rules: {

                pointsMultiplier: 3


            },

            seasonFinish: {

                1: 100,
                2: 80,
                3: 60,
                4: 50

            }

        },


        generationcup: {

            enabled: true,

            rules: {

                pointsMultiplier: 3

            },

            seasonFinish: {

                1: 100,
                2: 80,
                3: 60,
                4: 50

            }

        },


        juniorclubnight: {

            enabled: true,

            rules: {

                pointsMultiplier: 1

            },

            seasonFinish: {

                1: 100,
                2: 80,
                3: 60,
                4: 50

            }

        },


        racketballclubnight: {

            enabled: true,

            rules: {

                pointsMultiplier: 3

            },

            seasonFinish: {

                1: 100,
                2: 80,
                3: 60,
                4: 50

            }

        }

    }

};
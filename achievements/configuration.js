// ========================================
// ACHIEVEMENT CONFIGURATION
// Defines all achievement types, tiers and points
// ========================================

export const ACHIEVEMENT_CONFIGURATION = {
    achievements: [
        {
            id: "handicap_attendance",
            name: "Attendance",
            description: "Weeks played in the Wednesday Handicap",
            competition: "peteroberts",
            metric: "weeks",
            tiers: [
                { level: "easy", target: 10, points: 10 },
                { level: "medium", target: 25, points: 25 },
                { level: "hard", target: 100, points: 100 },
                { level: "epic", target: 1000, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "group_games",
            name: "Games Played",
            description: "Games played in the Wednesday Handicap",
            competition: "peteroberts",
            metric: "games",
            tiers: [
                { level: "easy", target: 50, points: 10 },
                { level: "medium", target: 250, points: 25 },
                { level: "hard", target: 750, points: 100 },
                { level: "epic", target: 2500, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "games_won",
            name: "Games Won",
            description: "Games won in the Wednesday Handicap",
            competition: "peteroberts",
            metric: "wins",
            tiers: [
                { level: "easy", target: 25, points: 10 },
                { level: "medium", target: 100, points: 25 },
                { level: "hard", target: 300, points: 100 },
                { level: "epic", target: 1000, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "handicap_wins",
            name: "Weekly Wins",
            description: "Weekly wins in the Wednesday Handicap",
            competition: "peteroberts",
            metric: "weeklyWins",
            tiers: [
                { level: "easy", target: 3, points: 10 },
                { level: "medium", target: 10, points: 25 },
                { level: "hard", target: 25, points: 100 },
                { level: "epic", target: 100, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "handicap_runners_up",
            name: "Runners Up",
            description: "Runner-up finishes in the Wednesday Handicap",
            competition: "peteroberts",
            metric: "runnersUp",
            tiers: [
                { level: "easy", target: 3, points: 10 },
                { level: "medium", target: 10, points: 25 },
                { level: "hard", target: 25, points: 100 },
                { level: "epic", target: 100, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "total_score",
            name: "Total Score",
            description: "Total points scored in the Wednesday Handicap",
            competition: "peteroberts",
            metric: "score",
            tiers: [
                { level: "easy", target: 250, points: 10 },
                { level: "medium", target: 1000, points: 25 },
                { level: "hard", target: 2500, points: 100 },
                { level: "epic", target: 10000, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "handicap_seasons",
            name: "Seasons",
            description: "Seasons played in the Wednesday Handicap",
            competition: "peteroberts",
            metric: "seasons",
            tiers: [
                { level: "easy", target: 2, points: 10 },
                { level: "medium", target: 3, points: 25 },
                { level: "hard", target: 5, points: 100 },
                { level: "epic", target: 10, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "junior_handicap_attendance",
            name: "Attendance (J)",
            description: "Weeks played in the Junior Clubnight",
            competition: "juniorclubnight",
            metric: "weeks",
            tiers: [
                { level: "easy", target: 10, points: 10 },
                { level: "medium", target: 25, points: 25 },
                { level: "hard", target: 100, points: 100 },
                { level: "epic", target: 1000, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "junior_handicap_score",
            name: "Junior Score",
            description: "Total points scored in the Junior Clubnight",
            competition: "juniorclubnight",
            metric: "score",
            tiers: [
                { level: "easy", target: 125, points: 10 },
                { level: "medium", target: 500, points: 25 },
                { level: "hard", target: 1250, points: 100 },
                { level: "epic", target: 5000, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "box_league_seasons",
            name: "Box Seasons",
            description: "Seasons played in the Squash Box Leagues",
            competition: "boxleagues",
            metric: "seasons",
            tiers: [
                { level: "easy", target: 2, points: 10 },
                { level: "medium", target: 5, points: 25 },
                { level: "hard", target: 10, points: 100 },
                { level: "epic", target: 25, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "box_league_played",
            name: "League Matches",
            description: "Matches played in the Squash Box Leagues",
            competition: "boxleagues",
            metric: "played",
            tiers: [
                { level: "easy", target: 5, points: 10 },
                { level: "medium", target: 15, points: 25 },
                { level: "hard", target: 50, points: 100 },
                { level: "epic", target: 125, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "box_league_wins",
            name: "League Wins",
            description: "Matches won in the Squash Box Leagues",
            competition: "boxleagues",
            metric: "won",
            tiers: [
                { level: "easy", target: 2, points: 10 },
                { level: "medium", target: 10, points: 25 },
                { level: "hard", target: 25, points: 100 },
                { level: "epic", target: 50, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        },
        {
            id: "box_league_points",
            name: "League Points",
            description: "Points earned in the Squash Box Leagues",
            competition: "boxleagues",
            metric: "points",
            tiers: [
                { level: "easy", target: 10, points: 10 },
                { level: "medium", target: 25, points: 25 },
                { level: "hard", target: 100, points: 100 },
                { level: "epic", target: 250, points: 500 },
                { level: "legendary", target: null, points: 1000 }
            ]
        }
    ]
};
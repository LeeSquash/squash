// ========================================
// DATABASE BUILDER CONFIGURATION
// Defines all competition sources and data structure
// ========================================

export const CONFIGURATION = {

    competitions: [

        {
            id: "peteroberts",
            spreadsheetId: "1hWIT4Zz98lv6yGhKJ6zAPbGvQmt1Ty_dXLpmAA7px3M",
            startRow: 3,
            columns: {
                place: "A",
                name: "B",
                games: "C",
                wins: "D",
                weeklyWins: "E",
                runnersUp: "F",
                weeks: "G",
                score: "H"
            },
            seasons: [
                { season: "2026/27", gid: "177383862" },
                { season: "2025/26", gid: "609811392" },
                { season: "2024/25", gid: "1448332020" },
                { season: "2023/24", gid: "485201543" },
                { season: "2022/23", gid: "107467510" },
                { season: "2021/22", gid: "1805298759" },
                { season: "2019/20", gid: "2015501302" },
                { season: "2018/19", gid: "2106645708" },
                { season: "2017/18", gid: "1973356220" },
                { season: "2016/17", gid: "1294972098" },
                { season: "2015/16", gid: "1434091666" },
                { season: "2014/15", gid: "879316616" }
            ]
        },

        {
            id: "juniorclubnight",
            spreadsheetId: "1JWFjiEYeyCIkVsyNfP3PKUyU7KxM_u2Ym1sr6hUw-Gg",
            startRow: 2,
            columns: {
                place: "A",
                name: "B",
                weeks: "C",
                score: "D"
            },
            seasons: [
                { season: "2026/27", gid: "0" },
                { season: "2025/26", gid: "1494398203" },
                { season: "2024/25", gid: "505669054" }
            ]
        },

        {
            id: "sltc",
            spreadsheetId: "1dWUO_n7Dx2qhQir7OgyC8jgzYuOAJAeTkwrCciFbEJc",
            startRow: 2,
            columns: {
                place: "A",
                name: "B",
                team: "C",
                score: "D"
            },
            seasons: [
                { season: "2026/27", gid: "719618828" },
                { season: "2025/26", gid: "1608891651" },
                { season: "2024/25", gid: "1265524802" }
            ]
        },

        {
            id: "generationcup",
            spreadsheetId: "1HTUu_Kj4_gHketMSmYO7mIpUcTqYjEelX_ZSEX0UqMc",
            startRow: 2,
            columns: {
                place: "A",
                name: "B",
                score: "C"
            },
            seasons: [
                { season: "2026/27", gid: "865362237" },
                { season: "2025/26", gid: "978745522" },
                { season: "2024/25", gid: "193457107" }
            ]
        },

        {
            id: "racketballclubnight",
            spreadsheetId: "1ytJzurKWV262BRsDF0pyhai049veXIxgHlzPkDME4AE",
            startRow: 2,
            columns: {
                place: "A",
                name: "B",
                score: "D"
            },
            seasons: [
                { season: "2026/27", gid: "0" },
                { season: "2025/26", gid: "1530884915" }
            ]
        }

    ]

};
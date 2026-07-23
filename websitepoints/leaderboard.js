// ========================================
// WEBSITE POINTS LEADERBOARD BUILDER
// Calculates all players points and levels
// ========================================

import { calculatePlayerPoints } from "./calculatepoints.js";
import { calculateLevel } from "./levels.js";
import fs from "fs";

const database = JSON.parse(
    fs.readFileSync("./data/database.json", "utf8")
);

const leaderboard = [];

Object.values(database.players).forEach(player => {

    const points = calculatePlayerPoints(player);

    const level = calculateLevel(points.total);

    leaderboard.push({
        name: player.name,
        points: points,
        level: level
    });

});

leaderboard.sort((a, b) => b.points.total - a.points.total);

fs.writeFileSync(
    "./data/leaderboard.json",
    JSON.stringify(leaderboard, null, 2)
);

console.log("Leaderboard created successfully");
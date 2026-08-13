// ========================================
// BOX LEAGUE POINT CALCULATOR
// Calculates total and seasonal points
// ========================================

import { POINTS_CONFIGURATION } from "./configuration.js";

export function calculateBoxLeaguePoints(records) {
    let totalPoints = 0;
    const seasonPoints = {};

    if (!records || records.length === 0) {
        return {
            total: 0,
            seasons: {}
        };
    }

    const rules = POINTS_CONFIGURATION.competitions.boxleagues.rules;

    records.forEach(record => {
        let points = 0;

        const seasons = Number(record.seasons) || 0;
        const played = Number(record.played) || 0;
        const won = Number(record.won) || 0;
        const highBox = Number(record.highBox) || 0;
        const leagueChampions = Number(record.leagueChampions) || 0;
        const leaguePoints = Number(record.points) || 0;

        points += seasons * rules.seasons;
        points += played * rules.played;
        points += won * rules.won;
        points += leaguePoints * rules.points;
        points += leagueChampions * rules.leagueChampions;

        if (highBox > 0) {
            points += Math.max(0, rules.highBoxStart - ((highBox - 1) * rules.highBoxDecrease));
        }

        totalPoints += points;

        const season = record.season;

        if (!seasonPoints[season]) {
            seasonPoints[season] = 0;
        }

        seasonPoints[season] += points;
    });

    return {
        total: totalPoints,
        seasons: seasonPoints
    };
}
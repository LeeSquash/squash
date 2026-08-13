// ========================================
// ACHIEVEMENT CALCULATOR
// Calculates player achievements and points
// ========================================

import { ACHIEVEMENT_CONFIGURATION } from "./configuration.js";

export function calculateAchievements(player) {
    const results = [];
    let totalPoints = 0;

    ACHIEVEMENT_CONFIGURATION.achievements.forEach(achievement => {
        const records = player.competitions?.[achievement.competition] || [];
        let value = 0;

        if (achievement.metric === "seasons") {
            if (achievement.competition === "boxleagues") {
                records.forEach(record => {
                    value += Number(record.seasons) || 0;
                });
            } else {
                value = new Set(
                    records
                        .map(record => record.season)
                        .filter(season => season)
                ).size;
            }
        } else {
            records.forEach(record => {
                value += Number(record[achievement.metric]) || 0;
            });
        }

        const tiers = achievement.tiers;
        let currentTier = null;
        let currentPoints = 0;
        let nextTier = null;
        let nextTarget = null;

        tiers.forEach(tier => {
            if (tier.target !== null && value >= tier.target) {
                currentTier = tier.level;
                currentPoints = tier.points;
            }
        });

        const nextTierData = tiers.find(
            tier => tier.target !== null && value < tier.target
        );

        if (nextTierData) {
            nextTier = nextTierData.level;
            nextTarget = nextTierData.target;
        }

        if (currentTier) {
            totalPoints += currentPoints;
        }

        let progress = 0;

        if (nextTarget !== null) {
            const previousTarget = currentTier
                ? tiers.find(tier => tier.level === currentTier)?.target || 0
                : 0;

            progress = Math.min(
                100,
                Math.max(
                    0,
                    ((value - previousTarget) /
                    (nextTarget - previousTarget)) * 100
                )
            );
        }

        // Only include achievements the player has actually earned.
        if (currentTier) {
            results.push({
                id: achievement.id,
                name: achievement.name,
                value: value,
                tier: currentTier,
                points: currentPoints,
                nextTier: nextTier,
                nextTarget: nextTarget,
                progress: Math.round(progress)
            });
        }
    });

    return {
        totalPoints: totalPoints,
        achievements: results
    };
}
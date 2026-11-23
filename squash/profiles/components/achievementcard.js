// ========================================
// ACHIEVEMENT COMPONENT
// Displays player achievements
// ========================================

import { renderAchievementBadge } from "./achievementbadge.js";

export function renderAchievementCard(player) {
    const achievementData = player.achievements || {};
    const achievements = achievementData.achievements || [];
    const totalPoints = achievementData.totalPoints || 0;

    return `
    <section class="achievement-card">
        <div class="achievement-header">
            <h2>Achievements</h2>
            <span class="achievement-points">${totalPoints} Points</span>
        </div>
        ${
            achievements.length > 0
            ? `<div class="achievement-list">${renderAchievements(achievements)}</div>`
            : `<p>No achievements yet.</p>`
        }
    </section>
    `;
}

function renderAchievements(achievements) {
    let html = "";
    achievements.forEach(achievement => {
        html += `
        <div class="achievement-item">
            ${renderAchievementBadge(achievement)}
        </div>
        `;
    });
    return html;
}
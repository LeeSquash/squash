// ========================================
// ACHIEVEMENT COMPONENT
// Displays player achievements
// ========================================

export function renderAchievementCard(player) {

    const achievements = player.achievements || [];

    return `
    <section class="achievement-card">

        <h2>Achievements</h2>

        ${
            achievements.length > 0
            ? renderAchievements(achievements)
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

            <strong>${achievement.title}</strong>

            <p>${achievement.description || ""}</p>

        </div>
        `;

    });

    return html;

}
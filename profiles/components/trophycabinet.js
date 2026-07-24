// ========================================
// TROPHY CABINET COMPONENT
// Displays player trophies
// ========================================

export function renderTrophyCabinet(player) {

    const trophies = player.trophies || [];

    return `
    <section class="trophy-card">

        <h2>Trophies</h2>

        ${
            trophies.length > 0
            ? renderTrophies(trophies)
            : `<p>No trophies yet.</p>`
        }

    </section>
    `;

}

function renderTrophies(trophies) {

    let html = "";

    trophies.forEach(trophy => {

        html += `
        <div class="trophy-item">

            <strong>${trophy.name}</strong>

            <span>${trophy.season || ""}</span>

        </div>
        `;

    });

    return html;

}
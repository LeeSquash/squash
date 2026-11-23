// ========================================
// SEASON CARD COMPONENT
// Displays individual competition season details
// ========================================

export function renderSeasonCard(season, points) {

    return `
    <div class="season-card">

        <h3>${season.season}</h3>

        <div class="season-stats">

            <div class="season-stat">
                <span>Finish</span>
                <strong>${ordinal(Number(season.place))}</strong>
            </div>

            <div class="season-stat">
                <span>Points</span>
                <strong>${points}</strong>
            </div>

        </div>

        <div class="season-details">

            ${renderStats(season)}

        </div>

    </div>
    `;

}


function renderStats(season) {

    let html = "";

    Object.entries(season).forEach(([key, value]) => {

        if (
            key === "season" ||
            key === "place" ||
            key === "name"
        ) {
            return;
        }

        html += `
        <div class="stat-line">

            <span>${formatLabel(key)}</span>

            <strong>${value}</strong>

        </div>
        `;

    });

    return html;

}


function formatLabel(text) {

    return text
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, letter => letter.toUpperCase());

}


function ordinal(number) {

    if (!number) return "-";

    if (number % 100 >= 11 && number % 100 <= 13) {
        return number + "th";
    }

    switch (number % 10) {

        case 1:
            return number + "st";

        case 2:
            return number + "nd";

        case 3:
            return number + "rd";

        default:
            return number + "th";

    }

}
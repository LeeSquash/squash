// ========================================
// COMPETITION CARD COMPONENT
// Displays competition summary and expandable seasons
// ========================================

import { renderSeasonCard } from "./seasoncard.js";

export function renderCompetitionCard(competition) {

    const seasonsPlayed = competition.stats
        ? competition.stats.length
        : 0;

    let bestFinish = null;

    if (competition.stats) {

        competition.stats.forEach(season => {

            const place = Number(season.place);

            if (
                place &&
                (bestFinish === null || place < bestFinish)
            ) {
                bestFinish = place;
            }

        });

    }

    let seasonHtml = "";

    if (competition.stats) {

        competition.stats.forEach(season => {

            const seasonPoints =
                competition.seasons[season.season] || 0;

            seasonHtml += renderSeasonCard(
                season,
                seasonPoints
            );

        });

    }

    return `
    <section class="competition-card">

        <div class="competition-title-line">

            <h2>
                ${competition.name}
                <span class="competition-points">
                    ${competition.points} Points
                </span>
            </h2>

        </div>


        <div class="competition-summary">

            <div class="summary-item">
                <span>Seasons</span>
                <strong>${seasonsPlayed}</strong>
            </div>


            <div class="summary-item">
                <span>Best Finish</span>
                <strong>${bestFinish ? ordinal(bestFinish) : "-"}</strong>
            </div>

        </div>


        <button class="season-toggle">
            + View Season History
        </button>


        <div class="season-container" style="display:none;">

            ${seasonHtml}

        </div>

    </section>
    `;

}


document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("season-toggle")) {
        return;
    }


    const button = event.target;

    const card = button.closest(".competition-card");

    const seasons =
        card.querySelector(".season-container");


    if (seasons.style.display === "none") {

        seasons.style.display = "block";

        button.innerText = "- Hide Season History";

    } else {

        seasons.style.display = "none";

        button.innerText = "+ View Season History";

    }

});


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
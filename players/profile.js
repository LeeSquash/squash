// ========================================
// PLAYER PROFILE RENDERER
// Takes fetched player data and builds profile
// ========================================


// HTML Elements

const nameHeading = document.getElementById("player-name");
const statusMsg = document.getElementById("status-message");
const visualOutput = document.getElementById("visual-output");


// Wait for database.js to finish fetching

window.addEventListener("playerDataLoaded", function () {


    const playerSeasons = window.playerSeasons;
    const targetPlayer = window.targetPlayer;



    if (!targetPlayer) {

        nameHeading.innerText = "No Player Selected";

        statusMsg.innerText =
            "❌ Missing Player Name";

        statusMsg.style.color = "red";

        visualOutput.innerHTML =
            `<p>Please add a player name to the URL.</p>`;

        return;

    }



    if (!playerSeasons || playerSeasons.length === 0) {


        nameHeading.innerText = targetPlayer;


        statusMsg.innerText =
            "❌ Profile Record Missing";

        statusMsg.style.color = "red";


        visualOutput.innerHTML =
            `<p>No records found for this player.</p>`;


        return;

    }



    // Format player name

    const formattedName =
        targetPlayer
            .toLowerCase()
            .replace(/\b\w/g, letter => letter.toUpperCase());


   nameHeading.innerText =
    `${formattedName} - Level ${calculatePlayerLevel(playerSeasons)}`;

    statusMsg.innerText =
        `✔ Loaded ${playerSeasons.length} Seasons`;

    statusMsg.style.color = "green";



    // ========================================
    // Calculate career totals
    // ========================================

    let totalGames = 0;
    let totalWins = 0;
    let totalWeeklyWins = 0;
    let totalRunnersUp = 0;
    let totalWeeks = 0;
    let totalScore = 0;

    let bestFinish = null;



    playerSeasons.forEach(season => {


        totalGames += Number(season.games) || 0;
        totalWins += Number(season.wins) || 0;
        totalWeeklyWins += Number(season.weeklyWins) || 0;
        totalRunnersUp += Number(season.runnersUp) || 0;
        totalWeeks += Number(season.weeks) || 0;
        totalScore += Number(season.score) || 0;



        const place = Number(season.place);



        // Lowest finishing position is best

        if (
            !isNaN(place) &&
            (bestFinish === null || place < bestFinish)
        ) {

            bestFinish = place;

        }


    });



    // Win percentage

    const winPercentage =
        totalGames > 0
            ? ((totalWins / totalGames) * 100).toFixed(1)
            : "0.0";



    // Convert 1,2,3 into 1st,2nd,3rd

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



    // ========================================
    // Build profile
    // ========================================


    let html = `


        <h2>
            Pete Roberts Handicap
        </h2>


        <div class="career-box">

            <h4>
                Career Summary
            </h4>



            <div class="stat-line">
                <strong>Seasons Played:</strong>
                <span class="stat-value">${playerSeasons.length}</span>
            </div>



            <div class="stat-line">
                <strong>Total Games:</strong>
                <span class="stat-value">${totalGames}</span>
            </div>



            <div class="stat-line">
                <strong>Total Wins:</strong>
                <span class="stat-value">${totalWins}</span>
            </div>



            <div class="stat-line">
                <strong>Win Percentage:</strong>
                <span class="stat-value">${winPercentage}%</span>
            </div>



            <div class="stat-line">
                <strong>Total Weekly Wins:</strong>
                <span class="stat-value">${totalWeeklyWins}</span>
            </div>



            <div class="stat-line">
                <strong>Total Runner Ups:</strong>
                <span class="stat-value">${totalRunnersUp}</span>
            </div>



            <div class="stat-line">
                <strong>Total Weeks Attended:</strong>
                <span class="stat-value">${totalWeeks}</span>
            </div>



            <div class="stat-line">
                <strong>Total Score:</strong>
                <span class="stat-value">${totalScore}</span>
            </div>



            <div class="stat-line">
                <strong>Best Season Finish:</strong>
                <span class="stat-value">${ordinal(bestFinish)}</span>
            </div>



        </div>



        <h2>
            Season History
        </h2>


    `;



    // ========================================
    // Individual seasons
    // ========================================


    for (const season of playerSeasons) {


        html += `


        <div class="career-box">


            <h4>
                ${season.season}
            </h4>



            <div class="stat-line">
                <strong>Final Standing:</strong>
                <span class="stat-value">${ordinal(Number(season.place))}</span>
            </div>



            <div class="stat-line">
                <strong>Games Played:</strong>
                <span class="stat-value">${season.games}</span>
            </div>



            <div class="stat-line">
                <strong>Games Won:</strong>
                <span class="stat-value">${season.wins}</span>
            </div>



            <div class="stat-line">
                <strong>Weekly Wins:</strong>
                <span class="stat-value">${season.weeklyWins}</span>
            </div>



            <div class="stat-line">
                <strong>Runner Up Placements:</strong>
                <span class="stat-value">${season.runnersUp}</span>
            </div>



            <div class="stat-line">
                <strong>Weeks Attended:</strong>
                <span class="stat-value">${season.weeks}</span>
            </div>



            <div class="stat-line">
                <strong>Total Score:</strong>
                <span class="stat-value">${season.score}</span>
            </div>


        </div>


        `;

    }



    visualOutput.innerHTML = html;


});
// ========================================
// PLAYER PROFILE RENDERER
// Takes fetched competition data and builds profile
// ========================================

const nameHeading = document.getElementById("player-name");
const statusMsg = document.getElementById("status-message");
const visualOutput = document.getElementById("visual-output");

const REQUIRED_COMPETITIONS = [
    "Pete Roberts Handicap",
    "Junior Clubnight",
    "SLTC",
    "Generation Cup",
    "Racketball Clubnight"
];

function checkCompetitionsLoaded() {

    const loaded = window.loadedCompetitions || [];

    const allLoaded = REQUIRED_COMPETITIONS.every(
        competition => loaded.includes(competition)
    );

    if (allLoaded) {
        buildProfile();
    }

}

window.addEventListener("competitionLoaded", checkCompetitionsLoaded);

checkCompetitionsLoaded();

function buildProfile() {

    const playerSeasons = window.playerSeasons || [];
    const juniorClubnight = window.juniorClubnight || [];
    const sltc = window.sltc || [];
    const generationCup = window.generationCup || [];
    const racketballClubnight = window.racketballClubnight || [];
    const targetPlayer = window.targetPlayer;

    if (!targetPlayer) {

        nameHeading.innerText = "No Player Selected";
        statusMsg.innerText = "❌ Missing Player Name";
        statusMsg.style.color = "red";
        visualOutput.innerHTML = `<p>Please add a player name to the URL.</p>`;

        return;

    }

    if (
        playerSeasons.length === 0 &&
        juniorClubnight.length === 0 &&
        sltc.length === 0 &&
        generationCup.length === 0 &&
        racketballClubnight.length === 0
    ) {

        nameHeading.innerText = targetPlayer;
        statusMsg.innerText = "❌ Profile Record Missing";
        statusMsg.style.color = "red";
        visualOutput.innerHTML = `<p>No records found for this player.</p>`;

        return;

    }

    const formattedName =
        targetPlayer
            .toLowerCase()
            .replace(/\b\w/g, letter => letter.toUpperCase());

    nameHeading.innerText = formattedName;

    statusMsg.innerText =
        `✔ Loaded ${playerSeasons.length + juniorClubnight.length + sltc.length + generationCup.length + racketballClubnight.length} Records`;

    statusMsg.style.color = "green";

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

    let html = "";

    // ========================================
    // PETE ROBERTS HANDICAP DISPLAY
    // ========================================

    if (playerSeasons.length > 0) {

        let totalGames = 0;
        let totalWins = 0;
        let totalScore = 0;
        let bestFinish = null;

        playerSeasons.forEach(season => {

            totalGames += Number(season.games) || 0;
            totalWins += Number(season.wins) || 0;
            totalScore += Number(season.score) || 0;

            const place = Number(season.place);

            if (!isNaN(place) && (bestFinish === null || place < bestFinish)) {
                bestFinish = place;
            }

        });

        const winPercentage =
            totalGames > 0
                ? ((totalWins / totalGames) * 100).toFixed(1)
                : "0.0";

        html += `
        <h2>Pete Roberts Handicap</h2>
        <div class="career-box">
            <h4>Career Summary</h4>
            <div class="stat-line"><strong>Seasons Played:</strong><span class="stat-value">${playerSeasons.length}</span></div>
            <div class="stat-line"><strong>Total Games:</strong><span class="stat-value">${totalGames}</span></div>
            <div class="stat-line"><strong>Total Wins:</strong><span class="stat-value">${totalWins}</span></div>
            <div class="stat-line"><strong>Win Percentage:</strong><span class="stat-value">${winPercentage}%</span></div>
            <div class="stat-line"><strong>Total Score:</strong><span class="stat-value">${totalScore}</span></div>
            <div class="stat-line"><strong>Best Season Finish:</strong><span class="stat-value">${ordinal(bestFinish)}</span></div>
        </div>
        <h2>Season History</h2>
        `;

        playerSeasons.forEach(season => {

            html += `
            <div class="career-box">
                <h4>${season.season}</h4>
                <div class="stat-line"><strong>Final Standing:</strong><span class="stat-value">${ordinal(Number(season.place))}</span></div>
                <div class="stat-line"><strong>Games Played:</strong><span class="stat-value">${season.games}</span></div>
                <div class="stat-line"><strong>Games Won:</strong><span class="stat-value">${season.wins}</span></div>
                <div class="stat-line"><strong>Total Score:</strong><span class="stat-value">${season.score}</span></div>
            </div>
            `;

        });

    }

    // ========================================
    // JUNIOR CLUBNIGHT DISPLAY
    // ========================================

    if (juniorClubnight.length > 0) {

        html += `<h2>Junior Clubnight</h2>`;

        juniorClubnight.forEach(season => {

            html += `
            <div class="career-box">
                <h4>${season.season}</h4>
                <div class="stat-line"><strong>Final Standing:</strong><span class="stat-value">${ordinal(Number(season.place))}</span></div>
                <div class="stat-line"><strong>Weeks:</strong><span class="stat-value">${season.weeks}</span></div>
                <div class="stat-line"><strong>Score:</strong><span class="stat-value">${season.score}</span></div>
            </div>
            `;

        });

    }


    // ========================================
    // SLTC DISPLAY
    // ========================================

    if (sltc.length > 0) {

        html += `<h2>Squash Levels Team Challenge</h2>`;

        sltc.forEach(season => {

            html += `
            <div class="career-box">
                <h4>${season.season}</h4>
                <div class="stat-line"><strong>Final Standing:</strong><span class="stat-value">${ordinal(Number(season.place))}</span></div>
                <div class="stat-line"><strong>Team:</strong><span class="stat-value">${season.team}</span></div>
                <div class="stat-line"><strong>Points:</strong><span class="stat-value">${season.points}</span></div>
            </div>
            `;

        });

    }


    // ========================================
    // GENERATION CUP DISPLAY
    // ========================================

    if (generationCup.length > 0) {

        html += `<h2>Generation Cup</h2>`;

        generationCup.forEach(season => {

            html += `
            <div class="career-box">
                <h4>${season.season}</h4>
                <div class="stat-line"><strong>Final Standing:</strong><span class="stat-value">${ordinal(Number(season.place))}</span></div>
                <div class="stat-line"><strong>Points:</strong><span class="stat-value">${season.points}</span></div>
            </div>
            `;

        });

    }

// ========================================
    // RACKETBALL CLUBNIGHT DISPLAY
    // ========================================

    if (racketballClubnight.length > 0) {

        html += `<h2>Racketball Clubnight</h2>`;

        racketballClubnight.forEach(season => {

            html += `
            <div class="career-box">
                <h4>${season.season}</h4>
                <div class="stat-line"><strong>Final Standing:</strong><span class="stat-value">${ordinal(Number(season.place))}</span></div>
                <div class="stat-line"><strong>Points:</strong><span class="stat-value">${season.points}</span></div>
            </div>
            `;

        });

    }


    visualOutput.innerHTML = html;

}

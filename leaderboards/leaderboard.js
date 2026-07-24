// ========================================
// LEADERBOARD RENDERER
// Displays website points leaderboard
// ========================================

const container = document.getElementById("leaderboard-container");

fetch("/squash/data/leaderboard.json")
.then(response => response.json())
.then(players => {

    container.innerHTML = "";

    const table = document.createElement("table");

    table.innerHTML = `
    <thead>
        <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Level</th>
            <th>Total Points</th>
        </tr>
    </thead>
    <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    players.forEach((player, index) => {

        const playerKey = player.name.toLowerCase();

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${index + 1}</td>
        <td>
            <button class="player-button">
                ${player.name}
            </button>
        </td>
        <td>Level ${player.level}</td>
        <td>${player.points.total}</td>
        `;

        const detailsRow = document.createElement("tr");

        detailsRow.style.display = "none";

        detailsRow.innerHTML = `
        <td colspan="4">

            <div class="player-details">

                <table class="breakdown-table">

                    <tr>
                        <td>Wednesday Handicap</td>
                        <td>${player.points.breakdown.peteroberts}</td>
                    </tr>

                    <tr>
                        <td>SL Team Challenge</td>
                        <td>${player.points.breakdown.sltc}</td>
                    </tr>

                    <tr>
                        <td>Generation Cup</td>
                        <td>${player.points.breakdown.generationcup}</td>
                    </tr>

                    <tr>
                        <td>Junior Clubnight</td>
                        <td>${player.points.breakdown.juniorclubnight}</td>
                    </tr>

                    <tr>
                        <td>Racketball Clubnight</td>
                        <td>${player.points.breakdown.racketballclubnight}</td>
                    </tr>

                    <tr class="total-row">
                        <td>Total Points</td>
                        <td>${player.points.total}</td>
                    </tr>

                </table>

                <a href="/squash/profiles/index.html?player=${playerKey}">
                    View Player Profile
                </a>

            </div>

        </td>
        `;

        row.querySelector(".player-button").onclick = function() {

            detailsRow.style.display =
                detailsRow.style.display === "none"
                ? "table-row"
                : "none";

        };

        tbody.appendChild(row);
        tbody.appendChild(detailsRow);

    });

    container.appendChild(table);

})
.catch(error => {

    console.error("Leaderboard loading error:", error);

    container.innerHTML = "Unable to load leaderboard.";

});
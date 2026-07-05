// 1. Get the player name from the browser URL parameter (?name=Dan Ngo)
const urlParams = new URLSearchParams(window.location.search);
let targetPlayer = urlParams.get('name') || "Dan Ngo";
document.getElementById("player-name").innerText = targetPlayer;

// 2. Setup the exact global pathway Google expects to find
window.google = {
    visualization: {
        Query: {
            setResponse: function(response) {
                
                if (response && response.table && response.table.rows) {
                    const rows = response.table.rows;

                    // Hardcoded standard column positions (A=0, B=1, C=2, etc.)
                    const COL_NAME = 1;  // Column B
                    const COL_GAMES = 2; // Column C
                    const COL_WON = 3;   // Column D
                    const COL_WEEKLY = 4;// Column E
                    const COL_UP = 5;    // Column F
                    const COL_WEEKS = 6; // Column G
                    const COL_SCORE = 7; // Column H

                    let playerFound = false;

                    // Start scanning rows from index 2 (Row 3 of your spreadsheet)
                    for (let i = 2; i < rows.length; i++) {
                        if (rows[i] && rows[i].c && rows[i].c[COL_NAME]) {
                            let sheetPlayerName = rows[i].c[COL_NAME].v ? rows[i].c[COL_NAME].v.toString().trim() : "";

                            // If we find a match for the target player
                            if (sheetPlayerName.toLowerCase() === targetPlayer.toLowerCase()) {
                                playerFound = true;

                                // Extract the stats for this single season
                                let gamesPlayed = parseInt(rows[i].c[COL_GAMES]?.v) || 0;
                                let gamesWon = parseInt(rows[i].c[COL_WON]?.v) || 0;
                                let weeklyWins = parseInt(rows[i].c[COL_WEEKLY]?.v) || 0;
                                let runnersUp = parseInt(rows[i].c[COL_UP]?.v) || 0;
                                let weeksAttended = parseInt(rows[i].c[COL_WEEKS]?.v) || 0;
                                let totalScore = parseInt(rows[i].c[COL_SCORE]?.v) || 0;

                                // Display the single-season dashboard immediately
                                document.getElementById("status-message").innerText = "✔ Current Season Profile Loaded!";
                                document.getElementById("status-message").style.color = "green";
                                document.getElementById("visual-output").innerHTML = `
                                    <div class="career-box">
                                        <h4>Current Season Stats (2026/2027)</h4>
                                        <div class="stat-line"><strong>Group Games Played:</strong> <span class="stat-value">${gamesPlayed}</span></div>
                                        <div class="stat-line"><strong>Games Won:</strong> <span class="stat-value">${gamesWon}</span></div>
                                        <div class="stat-line"><strong>Weekly Wins:</strong> <span class="stat-value">${weeklyWins}</span></div>
                                        <div class="stat-line"><strong>Runners Up Placements:</strong> <span class="stat-value">${runnersUp}</span></div>
                                        <div class="stat-line"><strong>Weeks Attended:</strong> <span class="stat-value">${weeksAttended}</span></div>
                                        <div class="stat-line"><strong>Total Score:</strong> <span class="stat-value">${totalScore}</span></div>
                                    </div>`;
                                break; // We found the player, stop looking
                            }
                        }
                    }

                    // If the loop finishes and never finds the player name
                    if (!playerFound) {
                        document.getElementById("status-message").innerText = "❌ Profile Record Missing";
                        document.getElementById("status-message").style.color = "red";
                        document.getElementById("visual-output").innerHTML = `<p>Could not find "${targetPlayer}" in the current season log.</p>`;
                    }

                } else {
                    document.getElementById("status-message").innerText = "❌ Error Reading Sheet Data";
                    document.getElementById("visual-output").innerText = "Google returned an empty or unreadable table structure.";
                }
            }
        }
    }
};

// 3. Fire off the request ONLY for the current active season tab (gid: 177383862)
const realSheetId = "1hWIT4Zz98lv6yGhKJ6zAPbGvQmt1Ty_dXLpmAA7px3M";
const targetGid = "177383862";

const script = document.createElement('script');
script.src = `https://google.com{realSheetId}/gviz/tq?gid=${targetGid}&tqx=responseHandler:google.visualization.Query.setResponse`;
document.body.appendChild(script);
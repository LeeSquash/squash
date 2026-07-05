// 1. Get the player name from the browser URL parameter (?name=Dan Ngo)
const urlParams = new URLSearchParams(window.location.search);
let targetPlayer = urlParams.get('name') || "Dan Ngo";
document.getElementById("player-name").innerText = targetPlayer;

// 2. Your true Spreadsheet ID and complete Master Season Index
const realSheetId = "1hWIT4Zz98lv6yGhKJ6zAPbGvQmt1Ty_dXLpmAA7px3M";
const seasons = [
    { year: "2026/2027", gid: "177383862" }, { year: "2025/2026", gid: "609811392" },
    { year: "2024/2025", gid: "1448332020" }, { year: "2023/2024", gid: "485201543" },
    { year: "2022/2023", gid: "107467510" }, { year: "2021/2022", gid: "1805298759" },
    { year: "2019/2020", gid: "2015501302" }, { year: "2018/2019", gid: "2106645708" },
    { year: "2017/2018", gid: "1973356220" }, { year: "2016/2017", gid: "1294972098" },
    { year: "2015/2016", gid: "1434091666" }, { year: "2014/2015", gid: "879316616" },
    { year: "2013/2014", gid: "1990142880" }, { year: "2012/2013", gid: "589272259" },
    { year: "2011/2012", gid: "1216106191" }
];

// Career calculation trackers
let totalGamesPlayed = 0, totalGamesWon = 0, totalWeeklyWins = 0;
let totalRunnersUp = 0, totalWeeksAttended = 0, lifetimeScore = 0;
let seasonsCount = 0, responsesReceived = 0;

// 3. Define the global object Google expects
window.google = {
    visualization: {
        Query: {
            setResponse: function(response) {
                responsesReceived++;

                // We put the logic in a try/catch block so an error on one old sheet won't freeze the page
                try {
                    if (response && response.table && response.table.rows) {
                        const rows = response.table.rows;

                        // Default fallback column positions based on your modern current season layout
                        let colMap = { place: 0, name: 1, games: 2, won: 3, weeklyWins: 4, up: 5, weeks: 6, score: 7 };

                        // FIXED: Explicitly look at Row 3 (index 2) and Row 4 (index 3) for stacked text
                        if (rows.length >= 4) {
                            let r1 = rows[2] && rows[2].c ? rows[2].c : [];
                            let r2 = rows[3] && rows[3].c ? rows[3].c : [];
                            let maxCols = Math.max(r1.length, r2.length);
                            
                            for(let idx = 0; idx < maxCols; idx++) {
                                let t1 = r1[idx] && r1[idx].v ? r1[idx].v.toString().toLowerCase().trim() : "";
                                let t2 = r2[idx] && r2[idx].v ? r2[idx].v.toString().toLowerCase().trim() : "";
                                let combined = (t1 + " " + t2).trim();

                                if (combined.includes("place")) colMap.place = idx;
                                if (combined.includes("name")) colMap.name = idx;
                                if (combined.includes("group games")) colMap.games = idx;
                                if (combined.includes("games won")) colMap.won = idx;
                                if (combined.includes("weekly wins")) colMap.weeklyWins = idx;
                                if (combined.includes("runners up")) colMap.up = idx;
                                if (combined.includes("weeks")) colMap.weeks = idx;
                                if (combined.includes("total score")) colMap.score = idx;
                            }
                        }

                        // Loop through rows starting at index 4 (Row 5) to locate the player
                        for (let i = 4; i < rows.length; i++) {
                            if (rows[i] && rows[i].c && rows[i].c[colMap.name]) {
                                let sheetPlayerName = rows[i].c[colMap.name].v ? rows[i].c[colMap.name].v.toString().trim() : "";

                                if (sheetPlayerName.toLowerCase() === targetPlayer.toLowerCase()) {
                                    seasonsCount++;
                                    
                                    totalGamesPlayed += parseInt(rows[i].c[colMap.games]?.v) || 0;
                                    totalGamesWon += parseInt(rows[i].c[colMap.won]?.v) || 0;
                                    totalWeeklyWins += parseInt(rows[i].c[colMap.weeklyWins]?.v) || 0;
                                    totalRunnersUp += parseInt(rows[i].c[colMap.up]?.v) || 0;
                                    totalWeeksAttended += parseInt(rows[i].c[colMap.weeks]?.v) || 0;
                                    lifetimeScore += parseInt(rows[i].c[colMap.score]?.v) || 0;
                                    break; 
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.error("Skipped processing a season tab due to formatting discrepancy:", e);
                }

                // Check if all 15 sheets have finished reporting back
                if (responsesReceived === seasons.length) {
                    renderFinalDashboard();
                }
            }
        }
    }
};

// 4. Render the data dashboard onto your HTML page
function renderFinalDashboard() {
    if (seasonsCount > 0) {
        document.getElementById("status-message").innerText = "✔ Career History Compiled Successfully";
        document.getElementById("status-message").style.color = "green";
        document.getElementById("visual-output").innerHTML = `
            <div class="stat-line"><strong>Total Registered Seasons:</strong> <span class="stat-value">${seasonsCount}</span></div>
            <div class="career-box">
                <h4>Lifetime Statistics</h4>
                <div class="stat-line"><strong>Total Group Games Played:</strong> <span class="stat-value">${totalGamesPlayed}</span></div>
                <div class="stat-line"><strong>Games Won:</strong> <span class="stat-value">${totalGamesWon}</span></div>
                <div class="stat-line"><strong>Weekly Wins:</strong> <span class="stat-value">${totalWeeklyWins}</span></div>
                <div class="stat-line"><strong>Runners Up Placements:</strong> <span class="stat-value">${totalRunnersUp}</span></div>
                <div class="stat-line"><strong>Total Weeks Attended:</strong> <span class="stat-value">${totalWeeksAttended}</span></div>
                <div class="stat-line"><strong>All-Time Cumulative Score:</strong> <span class="stat-value">${lifetimeScore}</span></div>
            </div>`;
    } else {
        document.getElementById("status-message").innerText = "❌ Profile Record Missing";
        document.getElementById("status-message").style.color = "red";
        document.getElementById("visual-output").innerHTML = `<p>No tournament logs found matching "${targetPlayer}".</p>`;
    }
}

// 5. Fire off individual data queries for every season
seasons.forEach(s => {
    const script = document.createElement('script');
    script.src = `https://google.com{realSheetId}/gviz/tq?gid=${s.gid}&tqx=responseHandler:google.visualization.Query.setResponse`;
    document.body.appendChild(script);
});
// ========================================
// PROFILE HEADER COMPONENT
// Displays player name, level, points and level bar
// ========================================

import { getLevelData } from "../../websitepoints/levels.js";
import { renderLevelBar } from "./levelbar.js";

export function renderProfileHeader(player) {

    const levelData = getLevelData(player.summary.points);

    return `
    <section class="profile-header">

        <div class="profile-header-main">

            <h1 class="player-name">
                ${player.name}
                <span class="player-level">
                    Level ${levelData.level}
                </span>
            </h1>

        </div>


        <div class="player-points">

            <strong>Total Points</strong>

            <span>
                ${player.summary.points}
            </span>

        </div>


        ${renderLevelBar(levelData)}

    </section>
    `;

}
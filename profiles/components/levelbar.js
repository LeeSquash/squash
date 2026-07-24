// ========================================
// LEVEL BAR COMPONENT
// Displays progress towards next level
// ========================================

export function renderLevelBar(levelData) {

    return `
    <div class="level-bar-container">

        <div class="level-bar-background">
            <div class="level-bar-fill" style="width:${levelData.progress}%"></div>
        </div>

        <div class="level-bar-text">
            Level ${levelData.level} Progress: ${levelData.progress}%
        </div>

    </div>
    `;

}
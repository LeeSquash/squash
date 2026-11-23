// ========================================
// squash/achievements/achievementdesign/colours.js
// ACHIEVEMENT COLOURS
// Central colour definitions for all achievement tiers
// ========================================

export const tierColours = {
    easy: {
        main: "#20c878",
        dark: "#087a47",
        light: "#8ff0bd",
        bright: "#b8ffd8"
    },
    medium: {
        main: "#2196f3",
        dark: "#075ca8",
        light: "#8fc9ff",
        bright: "#c4e4ff"
    },
    hard: {
        main: "#9b4dff",
        dark: "#4b1594",
        light: "#d5aaff",
        bright: "#ecd8ff"
    },
    epic: {
        main: "#f5a623",
        dark: "#9a5b00",
        light: "#ffe0a0",
        bright: "#fff0c7"
    },
    legendary: {
        main: "#e53935",
        dark: "#8f1512",
        light: "#ffaaa8",
        bright: "#ffd0ce"
    },
    locked: {
        main: "#777777",
        dark: "#444444",
        light: "#bbbbbb",
        bright: "#dddddd"
    }
};

export function getTierColour(tier) {
    return tierColours[tier] || tierColours.locked;
}
// ========================================
// squash/achievements/achievementdesign/medal.js
// ACHIEVEMENT MEDAL
// Creates the central tier medal for achievement badges
// ========================================

import { getTierColour } from "./colours.js";

export function renderMedal(achievement, safeId) {
    const tier = achievement.tier || "locked";
    const colour = getTierColour(tier);

    const currentTier = tier === "locked"
        ? "NOT EARNED"
        : tier.toUpperCase();

    if (tier === "locked") {
        return `
            <circle cx="500" cy="367" r="70"
                fill="#080b16"
                stroke="#e53935"
                stroke-width="8"/>

            <circle cx="500" cy="367" r="58"
                fill="${colour.dark}"
                stroke="${colour.light}"
                stroke-width="3"/>

            <circle cx="500" cy="367" r="48"
                fill="#111528"
                stroke="#e53935"
                stroke-width="2"/>

            <text x="500" y="380"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="38"
                font-weight="bold"
                fill="#f4d27a">
                ?
            </text>
        `;
    }

    return `
        <!-- Outer red achievement ring -->
        <circle cx="500" cy="367" r="70"
            fill="#080b16"
            stroke="#e53935"
            stroke-width="8"/>

        <!-- Medal -->
        <circle cx="500" cy="367" r="58"
            fill="url(#medalGradient-${safeId})"
            stroke="#f4d27a"
            stroke-width="3"/>

        <!-- Inner medal detail -->
        <circle cx="500" cy="367" r="49"
            fill="none"
            stroke="${colour.bright}"
            stroke-width="2"
            opacity="0.45"/>

        <!-- Achievement star -->
        <polygon
            points="500,314 515,342 546,347 523,368 528,400 500,385 472,400 477,368 454,347 485,342"
            fill="${colour.main}"
            stroke="${colour.bright}"
            stroke-width="3"/>

        <!-- Tier name -->
        <text x="500" y="373"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="16"
            font-weight="bold"
            letter-spacing="1"
            fill="#ffffff">
            ${currentTier}
        </text>

        <!-- Medal shine -->
        <path
            d="M470 328
               A42 42 0 0 1 522 321"
            fill="none"
            stroke="#ffffff"
            stroke-width="4"
            stroke-linecap="round"
            opacity="0.35"/>
    `;
}
// ========================================
// squash/profiles/components/achievementbadge.js
// ACHIEVEMENT BADGE
// Connects achievement data to the SVG design system
// ========================================

import { getTierColour } from "./achievementdesign/colours.js";
import { renderMedal } from "./achievementdesign/medals.js";
import { renderTrophy } from "./achievementdesign/trophy.js";

export function renderAchievementBadge(achievement) {
    const tier = achievement.tier || "locked";
    const colour = getTierColour(tier);
    const title = escapeXml(achievement.name || achievement.id || "Achievement");
    const points = Number(achievement.points) || 0;
    const currentTier = tier === "locked" ? "NOT EARNED" : tier.toUpperCase();
    const nextTier = achievement.nextTier ? achievement.nextTier.toUpperCase() : null;
    const nextTarget = achievement.nextTarget;
    const value = Number(achievement.value) || 0;
    const nextColour = achievement.nextTier ? getTierColour(achievement.nextTier) : colour;

    let progress = Number(achievement.progress) || 0;
    progress = Math.max(0, Math.min(100, progress));

    const progressWidth = 330 * (progress / 100);
    const valueText = value.toLocaleString();

    const safeId = String(achievement.id || "achievement")
        .replace(/[^a-zA-Z0-9_-]/g, "");

    const progressSection = renderProgress(
        tier,
        nextTier,
        nextTarget,
        nextColour,
        colour,
        valueText,
        progress,
        progressWidth
    );

    const medal = renderMedal({
        tier,
        colour,
        currentTier,
        safeId
    });

    const trophy = renderTrophy(
        achievement,
        safeId,
        progressSection
    );

    return `
    <div class="achievement-badge"
         title="${title} — ${currentTier}">
        <svg
            viewBox="0 0 1000 850"
            width="100%"
            role="img"
            aria-label="${title} - ${currentTier}"
            xmlns="http://www.w3.org/2000/svg">

            <defs>
                <linearGradient id="background-${safeId}"
                    x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#171d35"/>
                    <stop offset="55%" stop-color="#0e1326"/>
                    <stop offset="100%" stop-color="#080b16"/>
                </linearGradient>

                <linearGradient id="gold-${safeId}"
                    x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fff7c9"/>
                    <stop offset="25%" stop-color="#f7dc7b"/>
                    <stop offset="55%" stop-color="#d7a936"/>
                    <stop offset="100%" stop-color="#8b5a12"/>
                </linearGradient>

                <linearGradient id="namePlate-${safeId}"
                    x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#202846"/>
                    <stop offset="50%" stop-color="#11172c"/>
                    <stop offset="100%" stop-color="#080c19"/>
                </linearGradient>

                <linearGradient id="shine-${safeId}"
                    x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
                    <stop offset="45%" stop-color="#ffffff" stop-opacity="0.55"/>
                    <stop offset="55%" stop-color="#ffffff" stop-opacity="0.15"/>
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                </linearGradient>

                <filter id="shadow-${safeId}"
                    x="-30%" y="-20%" width="160%" height="160%">
                    <feDropShadow
                        dx="0"
                        dy="12"
                        stdDeviation="14"
                        flood-opacity="0.55"/>
                </filter>

                <filter id="glow-${safeId}"
                    x="-50%" y="-50%"
                    width="200%" height="200%">
                    <feGaussianBlur
                        stdDeviation="5"
                        result="blur"/>
                </filter>

                <radialGradient id="medalGradient-${safeId}"
                    cx="35%" cy="25%" r="75%">
                    <stop offset="0%" stop-color="${colour.bright}"/>
                    <stop offset="35%" stop-color="${colour.main}"/>
                    <stop offset="75%" stop-color="${colour.dark}"/>
                    <stop offset="100%" stop-color="#111528"/>
                </radialGradient>

                <linearGradient id="trophy-${safeId}"
                    x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fff5d0"/>
                    <stop offset="12%" stop-color="${colour.light}"/>
                    <stop offset="32%" stop-color="${colour.main}"/>
                    <stop offset="58%" stop-color="${colour.dark}"/>
                    <stop offset="82%" stop-color="#151a2e"/>
                    <stop offset="100%" stop-color="#080b16"/>
                </linearGradient>
            </defs>

            <rect
                x="220"
                y="35"
                width="560"
                height="785"
                rx="34"
                fill="url(#background-${safeId})"
                stroke="#252c47"
                stroke-width="3"/>

            <path
                d="M330 72 L670 72"
                stroke="url(#gold-${safeId})"
                stroke-width="4"/>

            <circle cx="320" cy="72" r="4" fill="#f4d27a"/>
            <circle cx="680" cy="72" r="4" fill="#f4d27a"/>

            ${trophy}

            <path
                d="M282 177
                   L718 177
                   L697 262
                   L303 262
                   Z"
                fill="url(#namePlate-${safeId})"
                stroke="${colour.light}"
                stroke-width="3"/>

            <path
                d="M300 190 L700 190"
                stroke="#f4d27a"
                stroke-width="2"
                opacity="0.7"/>

            <text
                x="500"
                y="232"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="47"
                font-weight="bold"
                letter-spacing="1"
                fill="#fff4cf">
                ${title}
            </text>

            <path
                d="M300 250 L700 250"
                stroke="${colour.main}"
                stroke-width="3"
                opacity="0.8"/>

            ${medal}

            <path
                d="M315 115 L685 115 L675 180 L325 180 Z"
                fill="url(#shine-${safeId})"
                opacity="0.25"/>

        </svg>
    </div>
    `;
}

function renderProgress(tier, nextTier, nextTarget, nextColour, colour, valueText, progress, progressWidth) {
    if (tier === "legendary") {
        return `
            <text x="500" y="628"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="19"
                font-weight="bold"
                letter-spacing="3"
                fill="#f4d27a">
                ACHIEVEMENT EARNED
            </text>
            <text x="500" y="667"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="30"
                font-weight="bold"
                letter-spacing="2"
                fill="${colour.bright}">
                LEGENDARY
            </text>
        `;
    }

    if (nextTier) {
        return `
            <text x="335" y="625"
                text-anchor="start"
                font-family="Arial, sans-serif"
                font-size="18"
                font-weight="bold"
                letter-spacing="2"
                fill="#d8dbe5">
                PROGRESS TO
            </text>

            <text x="455" y="625"
                text-anchor="start"
                font-family="Arial, sans-serif"
                font-size="21"
                font-weight="bold"
                letter-spacing="2"
                fill="${nextColour.bright}">
                ${nextTier}
            </text>

            <text x="665" y="625"
                text-anchor="end"
                font-family="Arial, sans-serif"
                font-size="21"
                font-weight="bold"
                fill="#ffffff">
                ${valueText}
                <tspan fill="#777d92" font-size="17">
                    / ${Number(nextTarget).toLocaleString()}
                </tspan>
            </text>

            <rect x="335" y="642"
                width="330"
                height="24"
                rx="12"
                fill="#0c1020"
                stroke="#50566b"
                stroke-width="2"/>

            <rect x="338" y="645"
                width="${Math.max(0, progressWidth - 6)}"
                height="18"
                rx="9"
                fill="${colour.main}"/>

            <rect x="338" y="645"
                width="${Math.max(0, progressWidth - 6)}"
                height="6"
                rx="3"
                fill="${colour.bright}"
                opacity="0.7"/>

            <text x="500" y="696"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="16"
                font-weight="bold"
                letter-spacing="1"
                fill="#aeb3c5">
                ${Math.round(progress)}% COMPLETE
            </text>
        `;
    }

    return `
        <text x="500" y="625"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="18"
            font-weight="bold"
            letter-spacing="2"
            fill="#d8dbe5">
            PROGRESS
        </text>

        <text x="500" y="662"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="30"
            font-weight="bold"
            fill="${colour.bright}">
            ${valueText}
        </text>
    `;
}

function escapeXml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
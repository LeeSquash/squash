// ========================================
// squash/profiles/components/achievementdesign/trophy.js
// ACHIEVEMENT TROPHY
// Creates the main trophy structure and loads the competition-specific base
// ========================================

import { getTierColour } from "./colours.js";
import { renderBase } from "./bases.js";

export function renderTrophy(achievement, safeId, progressSection = "") {
    const tier = achievement.tier || "locked";
    const colour = getTierColour(tier);

    return `
        <defs>
            <linearGradient id="trophy-${safeId}"
                x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff5d0"/>
                <stop offset="12%" stop-color="${colour.light}"/>
                <stop offset="32%" stop-color="${colour.main}"/>
                <stop offset="58%" stop-color="${colour.dark}"/>
                <stop offset="82%" stop-color="#151a2e"/>
                <stop offset="100%" stop-color="#080b16"/>
            </linearGradient>

            <linearGradient id="gold-${safeId}"
                x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fff7c9"/>
                <stop offset="25%" stop-color="#f7dc7b"/>
                <stop offset="55%" stop-color="#d7a936"/>
                <stop offset="100%" stop-color="#8b5a12"/>
            </linearGradient>

            <linearGradient id="background-${safeId}"
                x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#171d35"/>
                <stop offset="55%" stop-color="#0e1326"/>
                <stop offset="100%" stop-color="#080b16"/>
            </linearGradient>

            <radialGradient id="medalGradient-${safeId}"
                cx="35%" cy="25%" r="75%">
                <stop offset="0%" stop-color="${colour.bright}"/>
                <stop offset="35%" stop-color="${colour.main}"/>
                <stop offset="75%" stop-color="${colour.dark}"/>
                <stop offset="100%" stop-color="#111528"/>
            </radialGradient>

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
                x="-30%" y="-20%"
                width="160%" height="160%">
                <feDropShadow
                    dx="0"
                    dy="12"
                    stdDeviation="14"
                    flood-opacity="0.55"/>
            </filter>
        </defs>

        <path
            d="M325 112
               L675 112
               L668 195
               C664 265 630 314 566 344
               L552 351
               L552 441
               L615 471
               L615 503
               L385 503
               L385 471
               L448 441
               L448 351
               L434 344
               C370 314 336 265 332 195
               Z"
            fill="url(#trophy-${safeId})"
            stroke="${colour.light}"
            stroke-width="7"
            filter="url(#shadow-${safeId})"/>

        <path
            d="M332 148
               L255 148
               C192 148 172 187 182 238
               C192 290 234 313 305 296"
            fill="none"
            stroke="${colour.dark}"
            stroke-width="38"
            stroke-linecap="round"/>

        <path
            d="M332 148
               L255 148
               C192 148 172 187 182 238
               C192 290 234 313 305 296"
            fill="none"
            stroke="url(#gold-${safeId})"
            stroke-width="5"
            stroke-linecap="round"/>

        <path
            d="M668 148
               L745 148
               C808 148 828 187 818 238
               C808 290 766 313 695 296"
            fill="none"
            stroke="${colour.dark}"
            stroke-width="38"
            stroke-linecap="round"/>

        <path
            d="M668 148
               L745 148
               C808 148 828 187 818 238
               C808 290 766 313 695 296"
            fill="none"
            stroke="url(#gold-${safeId})"
            stroke-width="5"
            stroke-linecap="round"/>

        <path
            d="M325 112
               L675 112
               L668 193
               C663 258 626 307 562 334
               L438 334
               C374 307 337 258 332 193
               Z"
            fill="url(#background-${safeId})"
            stroke="${colour.main}"
            stroke-width="6"/>

        <path
            d="M354 143
               C370 245 400 286 450 305"
            fill="none"
            stroke="#ffffff"
            stroke-width="5"
            opacity="0.18"/>

        <path
            d="M306 98
               L694 98
               L680 130
               L320 130
               Z"
            fill="url(#gold-${safeId})"
            stroke="#fff0a8"
            stroke-width="3"/>

        <path
            d="M472 420 L472 456
               L414 478
               L586 478
               L528 456
               L528 420"
            fill="none"
            stroke="#ffffff"
            stroke-width="4"
            opacity="0.12"/>

        <!-- Competition-specific base -->
        ${renderBase(achievement.competition, {
            safeId,
            colour,
            progressSection,
            points: Number(achievement.points) || 0
        })}

        <path
            d="M315 115 L685 115 L675 180 L325 180 Z"
            fill="url(#shine-${safeId})"
            opacity="0.25"/>
    `;
}
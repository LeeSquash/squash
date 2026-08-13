// ========================================
// ACHIEVEMENT BADGE
// Creates SVG trophy-style achievement graphics
// ========================================

export function renderAchievementBadge(achievement) {
    const tier = achievement.tier || "locked";
    const tierColours = {
        easy: {
            main: "#20c878",
            dark: "#087a47",
            light: "#8ff0bd"
        },
        medium: {
            main: "#2196f3",
            dark: "#075ca8",
            light: "#8fc9ff"
        },
        hard: {
            main: "#9b4dff",
            dark: "#4b1594",
            light: "#d5aaff"
        },
        epic: {
            main: "#f5a623",
            dark: "#9a5b00",
            light: "#ffe0a0"
        },
        legendary: {
            main: "#e53935",
            dark: "#8f1512",
            light: "#ffaaa8"
        },
        locked: {
            main: "#777777",
            dark: "#444444",
            light: "#bbbbbb"
        }
    };

    const colour = tierColours[tier] || tierColours.locked;
    const title = escapeXml(
        achievement.name || achievement.id || "Achievement"
    );
    const points = Number(achievement.points) || 0;
    const currentTier = tier === "locked"
        ? "Not Earned"
        : tier.toUpperCase();
    const nextTier = achievement.nextTier
        ? achievement.nextTier.toUpperCase()
        : null;
    const nextTarget = achievement.nextTarget;
    const value = Number(achievement.value) || 0;

    const nextColour = achievement.nextTier
        ? tierColours[achievement.nextTier] || tierColours.locked
        : colour;

    let progress = Number(achievement.progress) || 0;
    if (progress < 0) progress = 0;
    if (progress > 100) progress = 100;

    const progressWidth = 335 * (progress / 100);
    const valueText = value.toLocaleString();

    let progressTitle = "";
    let progressText = "";

    if (nextTier && nextTarget !== null && nextTarget !== undefined) {
        progressTitle = `Progress to`;
        progressText = `${valueText} / ${Number(nextTarget).toLocaleString()}`;
    } else if (tier === "legendary") {
        progressTitle = "Achievement Earned";
        progressText = "LEGENDARY";
    } else {
        progressTitle = "Progress";
        progressText = valueText;
    }

    const tierBadge = tier === "locked"
        ? `
            <circle cx="500" cy="365" r="55"
                fill="${colour.dark}"
                stroke="#e53935"
                stroke-width="6"/>
            <text x="500" y="380"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="34"
                font-weight="bold"
                fill="#f4d27a">?</text>
        `
        : `
            <polygon
                points="500,305 518,340 557,346 529,373 536,412 500,393 464,412 471,373 443,346 482,340"
                fill="${colour.main}"
                stroke="#ffe29a"
                stroke-width="6"/>
            <text x="500" y="366"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="22"
                font-weight="bold"
                fill="#fff4d0">
                ${currentTier}
            </text>
        `;

    const progressSection = tier === "legendary"
        ? `
            <text x="500" y="658"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="22"
                font-weight="bold"
                fill="#f4d27a">
                ${progressTitle}
            </text>
            <text x="500" y="693"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="28"
                font-weight="bold"
                fill="${colour.light}">
                ${progressText}
            </text>
        `
        : `
            <text x="332.5" y="633"
                text-anchor="start"
                font-family="Arial, sans-serif"
                font-size="22"
                font-weight="bold"
                fill="#f4d27a">
                ${progressTitle}
                <tspan
                    fill="${nextColour.light}"
                    font-size="24">
                    ${nextTier}
                </tspan>
            </text>

            <text x="670" y="633"
                text-anchor="end"
                font-family="Arial, sans-serif"
                font-size="22"
                font-weight="bold"
                fill="#f7f2e8">
                ${progressText}
            </text>

            <rect x="332.5" y="648"
                width="335"
                height="26"
                rx="13"
                fill="#292d42"
                stroke="#8a8068"
                stroke-width="3"/>

            <rect x="332.5" y="648"
                width="${progressWidth}"
                height="26"
                rx="13"
                fill="${colour.main}"/>

            <text x="500" y="703"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="20"
                fill="#d9dce5">
                ${Math.round(progress)}% complete
            </text>
        `;

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
                <linearGradient id="badgeBackground-${achievement.id}"
                    x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"
                        stop-color="${colour.dark}"/>
                    <stop offset="100%"
                        stop-color="#101426"/>
                </linearGradient>

                <linearGradient id="trophyMetal-${achievement.id}"
                    x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"
                        stop-color="${colour.light}"/>
                    <stop offset="30%"
                        stop-color="${colour.main}"/>
                    <stop offset="65%"
                        stop-color="${colour.dark}"/>
                    <stop offset="100%"
                        stop-color="#151827"/>
                </linearGradient>

                <linearGradient id="goldHighlight-${achievement.id}"
                    x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"
                        stop-color="#fff0b0"/>
                    <stop offset="45%"
                        stop-color="#f4d27a"/>
                    <stop offset="100%"
                        stop-color="#b47a20"/>
                </linearGradient>

                <filter id="badgeShadow-${achievement.id}"
                    x="-30%"
                    y="-20%"
                    width="160%"
                    height="150%">
                    <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="12"
                        flood-opacity="0.5"/>
                </filter>
            </defs>

            <!-- Trophy silhouette -->
            <path
                d="M310 105
                   L690 105
                   L680 190
                   C678 250 650 300 610 325
                   C595 335 580 342 560 350
                   L560 445
                   L620 475
                   L620 505
                   L380 505
                   L380 475
                   L440 445
                   L440 350
                   C420 342 405 335 390 325
                   C350 300 322 250 320 190
                   Z"
                fill="url(#trophyMetal-${achievement.id})"
                stroke="${colour.light}"
                stroke-width="8"
                filter="url(#badgeShadow-${achievement.id})"/>

            <!-- Left trophy handle -->
            <path
                d="M325 145
                   L250 145
                   C180 145 155 190 170 245
                   C185 300 230 320 305 300"
                fill="none"
                stroke="${colour.main}"
                stroke-width="34"
                stroke-linecap="round"/>

            <path
                d="M325 145
                   L250 145
                   C180 145 155 190 170 245
                   C185 300 230 320 305 300"
                fill="none"
                stroke="#f4d27a"
                stroke-width="5"
                stroke-linecap="round"/>

            <!-- Right trophy handle -->
            <path
                d="M675 145
                   L750 145
                   C820 145 845 190 830 245
                   C815 300 770 320 695 300"
                fill="none"
                stroke="${colour.main}"
                stroke-width="34"
                stroke-linecap="round"/>

            <path
                d="M675 145
                   L750 145
                   C820 145 845 190 830 245
                   C815 300 770 320 695 300"
                fill="none"
                stroke="#f4d27a"
                stroke-width="5"
                stroke-linecap="round"/>

            <!-- Trophy bowl -->
            <path
                d="M315 105
                   L685 105
                   L675 195
                   C670 265 625 315 560 340
                   L440 340
                   C375 315 330 265 325 195
                   Z"
                fill="url(#badgeBackground-${achievement.id})"
                stroke="${colour.main}"
                stroke-width="7"/>

            <!-- Trophy rim -->
            <path
                d="M300 95
                   L700 95
                   L685 125
                   L315 125
                   Z"
                fill="url(#goldHighlight-${achievement.id})"
                stroke="${colour.light}"
                stroke-width="4"/>

            <!-- Achievement name -->
            <path
                d="M275 173
                   L725 173
                   L700 263
                   L300 263
                   Z"
                fill="${colour.dark}"
                stroke="#f4d27a"
                stroke-width="4"/>

            <text
                x="500"
                y="233"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="52"
                font-weight="bold"
                fill="#fff1bd">
                ${title}
            </text>

            <!-- Tier/star in trophy stem -->
            <circle
                cx="500"
                cy="365"
                r="62"
                fill="#171b30"
                stroke="#e53935"
                stroke-width="7"/>

            ${tierBadge}

            <!-- Trophy base -->
            <path
                d="M335 505
                   L665 505
                   L700 535
                   L700 735
                   L300 735
                   L300 535
                   Z"
                fill="${colour.dark}"
                stroke="${colour.light}"
                stroke-width="5"/>

            <!-- Base top -->
            <path
                d="M300 535
                   L700 535
                   L675 570
                   L325 570
                   Z"
                fill="url(#goldHighlight-${achievement.id})"
                stroke="${colour.light}"
                stroke-width="3"/>

            <!-- Progress inside trophy base -->
            ${progressSection}

            <!-- Points plinth -->
            <path
                d="M365 745
                   L635 745
                   L660 770
                   L640 800
                   L360 800
                   L340 770
                   Z"
                fill="#171b30"
                stroke="#f4d27a"
                stroke-width="3"/>

            <text
                x="500"
                y="787"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="48"
                font-weight="bold"
                fill="#ffd86b">
                ${points} points
            </text>

        </svg>
    </div>
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
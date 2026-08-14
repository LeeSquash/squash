// ========================================
// ACHIEVEMENT BADGE
// Premium SVG trophy-style achievement graphics
// ========================================

export function renderAchievementBadge(achievement) {
    const tier = achievement.tier || "locked";

    const tierColours = {
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

    const colour = tierColours[tier] || tierColours.locked;
    const title = escapeXml(achievement.name || achievement.id || "Achievement");
    const points = Number(achievement.points) || 0;

    const currentTier = tier === "locked"
        ? "NOT EARNED"
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
    progress = Math.max(0, Math.min(100, progress));

    const progressWidth = 330 * (progress / 100);
    const valueText = value.toLocaleString();

    const safeId = String(achievement.id || "achievement")
        .replace(/[^a-zA-Z0-9_-]/g, "");

    let progressSection = "";

    if (tier === "legendary") {
        progressSection = `
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
    } else if (nextTier) {
        progressSection = `
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
                <tspan
                    fill="#777d92"
                    font-size="17">
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
    } else {
        progressSection = `
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

    const tierBadge = tier === "locked"
        ? `
            <circle cx="500" cy="367" r="57"
                fill="#111528"
                stroke="#e53935"
                stroke-width="7"/>

            <circle cx="500" cy="367" r="47"
                fill="${colour.dark}"
                stroke="${colour.light}"
                stroke-width="2"/>

            <text x="500" y="379"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="36"
                font-weight="bold"
                fill="#f4d27a">
                ?
            </text>
        `
        : `
            <circle cx="500" cy="367" r="69"
                fill="#0c1020"
                stroke="#e53935"
                stroke-width="7"/>

            <circle cx="500" cy="367" r="58"
                fill="url(#medalGradient-${safeId})"
                stroke="#f4d27a"
                stroke-width="3"/>

            <polygon
                points="500,317 514,343 543,347 522,367 527,396 500,382 473,396 478,367 457,347 486,343"
                fill="${colour.main}"
                stroke="${colour.bright}"
                stroke-width="3"/>

            <text x="500" y="372"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="16"
                font-weight="bold"
                letter-spacing="1"
                fill="#ffffff">
                ${currentTier}
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

                <!-- Deep premium background -->
                <linearGradient id="background-${safeId}"
                    x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"
                        stop-color="#171d35"/>
                    <stop offset="55%"
                        stop-color="#0e1326"/>
                    <stop offset="100%"
                        stop-color="#080b16"/>
                </linearGradient>

                <!-- Trophy metal -->
                <linearGradient id="trophy-${safeId}"
                    x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"
                        stop-color="#fff5d0"/>
                    <stop offset="12%"
                        stop-color="${colour.light}"/>
                    <stop offset="32%"
                        stop-color="${colour.main}"/>
                    <stop offset="58%"
                        stop-color="${colour.dark}"/>
                    <stop offset="82%"
                        stop-color="#151a2e"/>
                    <stop offset="100%"
                        stop-color="#080b16"/>
                </linearGradient>

                <!-- Medal -->
                <radialGradient id="medalGradient-${safeId}"
                    cx="35%" cy="25%" r="75%">
                    <stop offset="0%"
                        stop-color="${colour.bright}"/>
                    <stop offset="35%"
                        stop-color="${colour.main}"/>
                    <stop offset="75%"
                        stop-color="${colour.dark}"/>
                    <stop offset="100%"
                        stop-color="#111528"/>
                </radialGradient>

                <!-- Gold -->
                <linearGradient id="gold-${safeId}"
                    x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"
                        stop-color="#fff7c9"/>
                    <stop offset="25%"
                        stop-color="#f7dc7b"/>
                    <stop offset="55%"
                        stop-color="#d7a936"/>
                    <stop offset="100%"
                        stop-color="#8b5a12"/>
                </linearGradient>

                <!-- Name plate -->
                <linearGradient id="namePlate-${safeId}"
                    x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"
                        stop-color="#202846"/>
                    <stop offset="50%"
                        stop-color="#11172c"/>
                    <stop offset="100%"
                        stop-color="#080c19"/>
                </linearGradient>

                <!-- Shine -->
                <linearGradient id="shine-${safeId}"
                    x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"
                        stop-color="#ffffff"
                        stop-opacity="0"/>
                    <stop offset="45%"
                        stop-color="#ffffff"
                        stop-opacity="0.55"/>
                    <stop offset="55%"
                        stop-color="#ffffff"
                        stop-opacity="0.15"/>
                    <stop offset="100%"
                        stop-color="#ffffff"
                        stop-opacity="0"/>
                </linearGradient>

                <filter id="shadow-${safeId}"
                    x="-30%"
                    y="-20%"
                    width="160%"
                    height="160%">
                    <feDropShadow
                        dx="0"
                        dy="12"
                        stdDeviation="14"
                        flood-opacity="0.55"/>
                </filter>

                <filter id="glow-${safeId}"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%">
                    <feGaussianBlur
                        stdDeviation="5"
                        result="blur"/>
                </filter>

            </defs>

            <!-- Subtle background -->
            <rect
                x="220"
                y="35"
                width="560"
                height="785"
                rx="34"
                fill="url(#background-${safeId})"
                stroke="#252c47"
                stroke-width="3"/>

            <!-- Decorative top line -->
            <path
                d="M330 72 L670 72"
                stroke="url(#gold-${safeId})"
                stroke-width="4"/>

            <circle
                cx="320"
                cy="72"
                r="4"
                fill="#f4d27a"/>

            <circle
                cx="680"
                cy="72"
                r="4"
                fill="#f4d27a"/>

            <!-- Trophy body -->
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

            <!-- Left handle -->
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

            <!-- Right handle -->
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

            <!-- Bowl interior -->
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

            <!-- Bowl highlight -->
            <path
                d="M354 143
                   C370 245 400 286 450 305"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                opacity="0.18"/>

            <!-- Trophy rim -->
            <path
                d="M306 98
                   L694 98
                   L680 130
                   L320 130
                   Z"
                fill="url(#gold-${safeId})"
                stroke="#fff0a8"
                stroke-width="3"/>

            <!-- Achievement name plate -->
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

            <!-- Central medal -->
            ${tierBadge}

            <!-- Stem highlight -->
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

            <!-- Trophy base -->
            <path
                d="M348 503
                   L652 503
                   L689 536
                   L689 724
                   L311 724
                   L311 536
                   Z"
                fill="url(#background-${safeId})"
                stroke="${colour.light}"
                stroke-width="5"/>

            <!-- Base colour panel -->
            <path
                d="M318 558
                   L682 558
                   L682 719
                   L318 719
                   Z"
                fill="${colour.dark}"
                opacity="0.42"/>

            <!-- Base top -->
            <path
                d="M311 535
                   L689 535
                   L666 569
                   L334 569
                   Z"
                fill="url(#gold-${safeId})"
                stroke="#fff0a8"
                stroke-width="3"/>

            <!-- Progress -->
            ${progressSection}

            <!-- Base bottom trim -->
            <path
                d="M318 715 L682 715"
                stroke="${colour.main}"
                stroke-width="4"/>

            <!-- Points plinth -->
            <path
                d="M365 735
                   L635 735
                   L657 758
                   L638 793
                   L362 793
                   L343 758
                   Z"
                fill="#0b0f20"
                stroke="url(#gold-${safeId})"
                stroke-width="3"/>

            <text
                x="500"
                y="780"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="39"
                font-weight="bold"
                letter-spacing="1"
                fill="#ffe28a">
                ${points}
                <tspan
                    font-size="20"
                    fill="#c5c9d5">
                    POINTS
                </tspan>
            </text>

            <!-- Final shine -->
            <path
                d="M315 115 L685 115 L675 180 L325 180 Z"
                fill="url(#shine-${safeId})"
                opacity="0.25"/>

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

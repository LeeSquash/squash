// ========================================
// squash/profiles/components/achievementdesign/bases.js
// Competition-specific achievement bases
// ========================================

export function renderBase(competition, options = {}) {
    const {
        safeId = "achievement",
        colour = {},
        progressSection = "",
        points = 0
    } = options;

    const competitionKey = String(competition || "")
        .trim()
        .toLowerCase();

    const baseRenderers = {
        peteroberts: renderHandicapBase,
        boxleagues: renderLeagueBase,
        sltc: renderSLTCBase,
        juniorclubnight: renderJuniorBase
    };

    const renderer = baseRenderers[competitionKey] || renderDefaultBase;

    return renderer({
        safeId,
        colour,
        progressSection,
        points
    });
}

// ========================================
// PETER ROBERTS HANDICAP
// Traditional trophy / engraved plinth
// ========================================

function renderHandicapBase({ safeId, colour, progressSection, points }) {
    return `
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

        <path
            d="M318 558
               L682 558
               L682 719
               L318 719
               Z"
            fill="${colour.dark}"
            opacity="0.42"/>

        <path
            d="M311 535
               L689 535
               L666 569
               L334 569
               Z"
            fill="url(#gold-${safeId})"
            stroke="#fff0a8"
            stroke-width="3"/>

        ${progressSection}

        <path
            d="M318 715 L682 715"
            stroke="${colour.main}"
            stroke-width="4"/>

        ${renderPointsPlinth(safeId, points)}
    `;
}

// ========================================
// BOX LEAGUES
// Shield / league-table inspired base
// ========================================

function renderLeagueBase({ safeId, colour, progressSection, points }) {
    return `
        <path
            d="M350 503
               L650 503
               L675 530
               L675 720
               L325 720
               L325 530
               Z"
            fill="url(#background-${safeId})"
            stroke="${colour.light}"
            stroke-width="5"/>

        <path
            d="M325 548
               L675 548
               L675 720
               L325 720
               Z"
            fill="${colour.dark}"
            opacity="0.38"/>

        <path
            d="M325 528
               L675 528
               L650 560
               L350 560
               Z"
            fill="url(#gold-${safeId})"
            stroke="#fff0a8"
            stroke-width="3"/>

        <path
            d="M350 590 L650 590
               M350 625 L650 625
               M350 660 L650 660"
            stroke="${colour.light}"
            stroke-width="2"
            opacity="0.35"/>

        <path
            d="M470 570
               L530 570
               L545 610
               L530 650
               L500 675
               L470 650
               L455 610
               Z"
            fill="${colour.dark}"
            stroke="${colour.light}"
            stroke-width="3"/>

        <path
            d="M470 590 L530 590"
            stroke="#f4d27a"
            stroke-width="2"/>

        ${progressSection}

        <path
            d="M345 712 L655 712"
            stroke="${colour.main}"
            stroke-width="4"/>

        ${renderPointsPlinth(safeId, points)}
    `;
}

// ========================================
// SLTC
// Team / championship style base
// ========================================

function renderSLTCBase({ safeId, colour, progressSection, points }) {
    return `
        <path
            d="M345 503
               L655 503
               L690 540
               L690 720
               L310 720
               L310 540
               Z"
            fill="url(#background-${safeId})"
            stroke="${colour.light}"
            stroke-width="5"/>

        <path
            d="M325 560 L430 560 L430 705 L325 705 Z"
            fill="${colour.dark}"
            opacity="0.5"/>

        <path
            d="M570 560 L675 560 L675 705 L570 705 Z"
            fill="${colour.dark}"
            opacity="0.5"/>

        <path
            d="M430 552
               L570 552
               L590 575
               L570 600
               L430 600
               L410 575
               Z"
            fill="url(#gold-${safeId})"
            stroke="#fff0a8"
            stroke-width="3"/>

        <circle
            cx="377"
            cy="625"
            r="27"
            fill="#0b0f20"
            stroke="${colour.light}"
            stroke-width="3"/>

        <circle
            cx="623"
            cy="625"
            r="27"
            fill="#0b0f20"
            stroke="${colour.light}"
            stroke-width="3"/>

        <path
            d="M362 625 L392 625
               M608 625 L638 625"
            stroke="#f4d27a"
            stroke-width="3"/>

        ${progressSection}

        <path
            d="M325 712 L675 712"
            stroke="${colour.main}"
            stroke-width="4"/>

        ${renderPointsPlinth(safeId, points)}
    `;
}

// ========================================
// JUNIOR CLUBNIGHT
// More energetic / playful base
// ========================================

function renderJuniorBase({ safeId, colour, progressSection, points }) {
    return `
        <path
            d="M355 503
               L645 503
               L700 545
               L675 720
               L325 720
               L300 545
               Z"
            fill="url(#background-${safeId})"
            stroke="${colour.light}"
            stroke-width="5"/>

        <path
            d="M320 560 L410 560 L390 705 L325 705 Z"
            fill="${colour.main}"
            opacity="0.25"/>

        <path
            d="M680 560 L590 560 L610 705 L675 705 Z"
            fill="${colour.main}"
            opacity="0.25"/>

        <polygon
            points="500,560
                    510,582
                    535,578
                    521,600
                    540,617
                    515,620
                    500,642
                    485,620
                    460,617
                    479,600
                    465,578
                    490,582"
            fill="${colour.main}"
            stroke="${colour.bright}"
            stroke-width="3"/>

        ${progressSection}

        <path
            d="M330 712 L670 712"
            stroke="${colour.main}"
            stroke-width="5"/>

        ${renderPointsPlinth(safeId, points)}
    `;
}

// ========================================
// DEFAULT
// ========================================

function renderDefaultBase({ safeId, colour, progressSection, points }) {
    return renderHandicapBase({
        safeId,
        colour,
        progressSection,
        points
    });
}

// ========================================
// SHARED POINTS PLINTH
// ========================================

function renderPointsPlinth(safeId, points) {
    return `
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
    `;
}
// ========================================
// FILE: /squash/achievementdesign/designlab.js
// ACHIEVEMENT DESIGN LAB
// Modular SVG badge design laboratory
// ========================================

const state = {
    base: "shield",
    frame: "classic",
    icon: "trophy",
    decoration: "stars",
    competition: "handicap",
    finish: "metal",
    tier: "legendary"
};

const tiers = {
    easy: {
        name: "Easy",
        main: "#58b879",
        bright: "#a7e4bc",
        dark: "#24613d",
        description: "Entry-level achievement"
    },
    medium: {
        name: "Medium",
        main: "#4e9fd1",
        bright: "#a9dcf5",
        dark: "#225474",
        description: "Intermediate achievement"
    },
    hard: {
        name: "Hard",
        main: "#9365d5",
        bright: "#d3b6f4",
        dark: "#51328a",
        description: "Difficult achievement"
    },
    epic: {
        name: "Epic",
        main: "#d56d42",
        bright: "#ffc0a1",
        dark: "#87371f",
        description: "Exceptional achievement"
    },
    legendary: {
        name: "Legendary",
        main: "#d7a936",
        bright: "#fff0a9",
        dark: "#81540d",
        description: "Highest achievement tier"
    }
};

const bases = {
    shield: {
        name: "Shield",
        description: "Competitive shield silhouette",
        visual: "Tall vertical badge with broad shoulders and a pointed lower section.",
        geometry: "Outer width 440 units, outer height 430 units, centred at x=300.",
        render: renderShield
    },
    crest: {
        name: "Crest",
        description: "Traditional club crest",
        visual: "Heraldic crest with rounded shoulders and a pronounced pointed base.",
        geometry: "Broad upper body narrowing towards a curved point.",
        render: renderCrest
    },
    medal: {
        name: "Medal",
        description: "Circular medal",
        visual: "Large circular medal with concentric metallic rings.",
        geometry: "Circle centred at 300,330 with radius 210.",
        render: renderMedal
    },
    hexagon: {
        name: "Hexagon",
        description: "Modern geometric badge",
        visual: "Six-sided competitive emblem with strong straight edges.",
        geometry: "Regular horizontal hexagonal silhouette.",
        render: renderHexagon
    },
    diamond: {
        name: "Diamond",
        description: "Angular premium badge",
        visual: "Tall four-point diamond silhouette.",
        geometry: "Four major points with equal diagonal proportions.",
        render: renderDiamond
    },
    ribbon: {
        name: "Ribbon",
        description: "Award ribbon",
        visual: "Ceremonial award shape with broad shoulders and tapered lower edge.",
        geometry: "Vertical ribbon body with angled lower corners.",
        render: renderRibbon
    }
};

const frames = {
    classic: {
        name: "Classic",
        description: "Double-line frame",
        visual: "Clean metallic outer border with a finer inner highlight.",
        geometry: "Two inset rounded rectangular borders.",
        render: renderClassicFrame
    },
    heavy: {
        name: "Championship",
        description: "Heavy championship frame",
        visual: "Thick dark outer frame with a bright metallic inner edge.",
        geometry: "Wide 18-unit outer stroke with 3-unit inner highlight.",
        render: renderHeavyFrame
    },
    double: {
        name: "Triple Line",
        description: "Layered premium frame",
        visual: "Three separate border layers creating visual depth.",
        geometry: "Three inset rectangular paths.",
        render: renderDoubleFrame
    },
    angular: {
        name: "Angular",
        description: "Technical geometric frame",
        visual: "Chamfered corners give the badge a modern sporting identity.",
        geometry: "Eight-sided outer and inner frames.",
        render: renderAngularFrame
    },
    ornate: {
        name: "Ornate",
        description: "Decorative premium frame",
        visual: "Layered metallic frame with four corner ornaments.",
        geometry: "Rounded frame plus four circular corner details.",
        render: renderOrnateFrame
    },
    none: {
        name: "None",
        description: "No frame",
        visual: "The base shape remains completely exposed.",
        geometry: "No outer framing layer.",
        render: () => ""
    }
};

const icons = {
    trophy: {
        name: "Trophy",
        description: "Championship cup",
        visual: "Traditional trophy with cup, handles, stem and base.",
        geometry: "Central cup approximately 180 units wide.",
        render: renderTrophy
    },
    crown: {
        name: "Crown",
        description: "Elite crown",
        visual: "Five-point royal crown used for elite achievements.",
        geometry: "Wide five-point crown with heavy metallic base.",
        render: renderCrown
    },
    star: {
        name: "Star",
        description: "Achievement star",
        visual: "Large multi-point star representing achievement.",
        geometry: "Ten-point star centred on the badge.",
        render: renderStar
    },
    ball: {
        name: "Squash Ball",
        description: "Squash identity",
        visual: "Dark squash ball with curved highlight seams.",
        geometry: "Circular ball with two curved seam paths.",
        render: renderBall
    },
    target: {
        name: "Target",
        description: "Precision target",
        visual: "Concentric target symbol representing accuracy and progress.",
        geometry: "Three circular rings with central bullseye.",
        render: renderTarget
    },
    lightning: {
        name: "Lightning",
        description: "Speed symbol",
        visual: "Angular lightning bolt representing speed and momentum.",
        geometry: "Six-point angular bolt.",
        render: renderLightning
    },
    number: {
        name: "Number",
        description: "Milestone number",
        visual: "Large metallic number representing a numerical achievement.",
        geometry: "Oversized centred numeral.",
        render: renderNumber
    },
    crownstar: {
        name: "Crown + Star",
        description: "Elite combination",
        visual: "Achievement star combined with a smaller crown.",
        geometry: "Large star with crown overlay.",
        render: renderCrownStar
    }
};

const decorations = {
    stars: {
        name: "Stars",
        description: "Achievement stars",
        visual: "Small stars surrounding the main emblem.",
        geometry: "Four small metallic points positioned around the icon.",
        render: renderStars
    },
    rays: {
        name: "Rays",
        description: "Energy rays",
        visual: "Short rays extending outward from the centre.",
        geometry: "Four diagonal accent strokes.",
        render: renderRays
    },
    laurels: {
        name: "Laurels",
        description: "Victory laurels",
        visual: "Curved laurel branches representing victory.",
        geometry: "Two symmetrical curved branches with leaves.",
        render: renderLaurels
    },
    corners: {
        name: "Corners",
        description: "Corner brackets",
        visual: "Technical corner markers framing the emblem.",
        geometry: "Four L-shaped corner elements.",
        render: renderCorners
    },
    dots: {
        name: "Dots",
        description: "Minimal dots",
        visual: "Small paired dots used as restrained decoration.",
        geometry: "Eight circular accent points.",
        render: renderDots
    },
    none: {
        name: "None",
        description: "No decoration",
        visual: "No additional decorative layer.",
        geometry: "No decorative geometry.",
        render: () => ""
    }
};

const competitions = {
    handicap: {
        name: "Wednesday Handicap",
        short: "HANDICAP",
        description: "Traditional Wednesday Handicap identity",
        visual: "A competitive club-night identity based around handicap squash.",
        accent: "#d7a936",
        render: renderHandicapIdentity
    },
    sltc: {
        name: "SL Team Challenge",
        short: "TEAM CHALLENGE",
        description: "Team competition identity",
        visual: "Strong team-oriented identity using paired elements.",
        accent: "#4e9fd1",
        render: renderSLTCIdentity
    },
    generation: {
        name: "Generation Cup",
        short: "GENERATION CUP",
        description: "Inter-generational competition identity",
        visual: "Formal cup identity with a family/team feel.",
        accent: "#9365d5",
        render: renderGenerationIdentity
    },
    junior: {
        name: "Junior Clubnight",
        short: "JUNIOR",
        description: "Junior competition identity",
        visual: "Energetic and youthful competition identity.",
        accent: "#58b879",
        render: renderJuniorIdentity
    },
    racketball: {
        name: "Racketball Clubnight",
        short: "RACKETBALL",
        description: "Racketball competition identity",
        visual: "Distinct racketball identity separate from squash competitions.",
        accent: "#d56d42",
        render: renderRacketballIdentity
    },
    boxleague: {
        name: "Squash Box Leagues",
        short: "BOX LEAGUES",
        description: "League competition identity",
        visual: "Structured league-oriented identity.",
        accent: "#4e9fd1",
        render: renderBoxLeagueIdentity
    }
};

const finishes = {
    metal: {
        name: "Metal",
        description: "Polished metallic",
        visual: "Hard metallic highlights and dark reflective edges.",
        render: renderMetalFinish
    },
    enamel: {
        name: "Enamel",
        description: "Gloss enamel",
        visual: "Smooth saturated surface with a clean highlight.",
        render: renderEnamelFinish
    },
    glass: {
        name: "Glass",
        description: "Translucent glass",
        visual: "Layered translucent treatment with bright reflections.",
        render: renderGlassFinish
    },
    stone: {
        name: "Stone",
        description: "Engraved stone",
        visual: "Dark matte material with engraved highlights.",
        render: renderStoneFinish
    }
};

function esc(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function svgDefs(tier, finish) {
    return `
        <defs>
            <linearGradient id="badgeBackground"
                x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#202942"/>
                <stop offset="55%" stop-color="#11172b"/>
                <stop offset="100%" stop-color="#080b15"/>
            </linearGradient>

            <linearGradient id="metal"
                x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${tier.bright}"/>
                <stop offset="28%" stop-color="${tier.main}"/>
                <stop offset="65%" stop-color="${tier.dark}"/>
                <stop offset="100%" stop-color="#111528"/>
            </linearGradient>

            <linearGradient id="finish"
                x1="0" y1="0" x2="0" y2="1">
                ${finish.render(tier)}
            </linearGradient>

            <radialGradient id="badgeGlow">
                <stop offset="0%"
                    stop-color="${tier.bright}"
                    stop-opacity=".28"/>
                <stop offset="100%"
                    stop-color="${tier.main}"
                    stop-opacity="0"/>
            </radialGradient>

            <filter id="badgeShadow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%">
                <feDropShadow
                    dx="0"
                    dy="12"
                    stdDeviation="12"
                    flood-opacity=".55"/>
            </filter>

            <filter id="softGlow">
                <feGaussianBlur stdDeviation="10"/>
            </filter>
        </defs>
    `;
}

function makeSvg(content, title, description, viewBox = "0 0 600 700") {
    return `
        <svg
            viewBox="${viewBox}"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="${esc(title)}"
            data-design-lab-svg="true">

            <title>${esc(title)}</title>
            <desc>${esc(description)}</desc>

            ${content}
        </svg>
    `;
}

function renderCompleteBadge() {
    const tier = tiers[state.tier];
    const base = bases[state.base];
    const frame = frames[state.frame];
    const icon = icons[state.icon];
    const decoration = decorations[state.decoration];
    const competition = competitions[state.competition];
    const finish = finishes[state.finish];

    const description =
        `Achievement badge using ${base.name} base, ` +
        `${frame.name} frame, ${icon.name} symbol, ` +
        `${decoration.name} decoration, ${competition.name} identity ` +
        `and ${finish.name} finish. Tier is ${tier.name}.`;

    return makeSvg(`
        ${svgDefs(tier, finish)}

        <rect
            x="20"
            y="20"
            width="560"
            height="660"
            rx="35"
            fill="#080b14"
            filter="url(#badgeShadow)"/>

        <ellipse
            cx="300"
            cy="310"
            rx="250"
            ry="270"
            fill="url(#badgeGlow)"
            filter="url(#softGlow)"/>

        ${base.render(tier)}
        ${decoration.render(tier)}
        ${frame.render(tier)}
        ${icon.render(tier)}
        ${competition.render(tier, state.finish)}

        <g data-layer="title">
            <text
                x="300"
                y="515"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="31"
                font-weight="bold"
                letter-spacing="3"
                fill="#ffffff">
                CHAMPION
            </text>

            <text
                x="300"
                y="548"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="15"
                font-weight="bold"
                letter-spacing="4"
                fill="${tier.bright}">
                ${esc(competition.short)}
            </text>

            <text
                x="300"
                y="583"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="12"
                font-weight="bold"
                letter-spacing="3"
                fill="#858da3">
                ${esc(tier.name.toUpperCase())}
            </text>
        </g>
    `, "Complete achievement badge", description);
}

function renderModuleSvg(type, key) {
    const tier = tiers[state.tier];
    const collection = getCollection(type);
    const item = collection[key];

    let content = "";

    if (type === "base") content = item.render(tier);
    if (type === "frame") content = item.render(tier);
    if (type === "icon") content = item.render(tier);
    if (type === "decoration") content = item.render(tier);
    if (type === "competition") content = item.render(tier, state.finish);
    if (type === "finish") {
        content = `
            <rect
                x="40"
                y="40"
                width="220"
                height="220"
                rx="35"
                fill="url(#badgeBackground)"/>
            <rect
                x="55"
                y="55"
                width="190"
                height="190"
                rx="25"
                fill="url(#finish)"/>
        `;
    }

    return makeSvg(`
        ${svgDefs(tier, finishes[state.finish])}
        ${content}
    `, `${type} module: ${item.name}`, item.visual, "0 0 300 300");
}

function getCollection(type) {
    if (type === "base") return bases;
    if (type === "frame") return frames;
    if (type === "icon") return icons;
    if (type === "decoration") return decorations;
    if (type === "competition") return competitions;
    if (type === "finish") return finishes;
    return {};
}

function buildOptions(containerId, data, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = Object.entries(data).map(([key, item]) => `
        <button
            class="option ${state[type] === key ? "active" : ""}"
            data-type="${type}"
            data-key="${key}">

            <span class="option-name">
                ${esc(item.name)}
            </span>

            <span class="option-description">
                ${esc(item.description)}
            </span>
        </button>
    `).join("");
}

function buildTiers() {
    const container = document.getElementById("tierOptions");
    if (!container) return;

    container.innerHTML = Object.entries(tiers).map(([key, tier]) => `
        <button
            class="tier-option ${state.tier === key ? "active" : ""}"
            data-type="tier"
            data-key="${key}"
            style="--tier-colour:${tier.main}">

            ${esc(tier.name.toUpperCase())}
        </button>
    `).join("");
}

function buildGallery(containerId, type, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = Object.entries(data).map(([key, item]) => `
        <article
            class="module-card"
            data-module-type="${type}"
            data-module="${key}">

            <div class="module-preview">
                ${renderModuleSvg(type, key)}
            </div>

            <div class="module-heading">
                <span>${esc(type.toUpperCase())}</span>
                <strong>${esc(item.name)}</strong>
            </div>

            <p class="module-description">
                ${esc(item.description)}
            </p>

            <div class="visual-spec">
                <strong>WHAT THIS SHOULD LOOK LIKE</strong>
                <p>${esc(item.visual)}</p>
            </div>

            <div class="geometry-spec">
                <strong>GEOMETRY</strong>
                <p>${esc(item.geometry)}</p>
            </div>

            <details class="svg-inspection">
                <summary>Inspect SVG</summary>
                <pre>${esc(renderModuleSvg(type, key))}</pre>
            </details>
        </article>
    `).join("");
}

function buildDesignReport() {
    const tier = tiers[state.tier];

    const items = [
        ["BASE", bases[state.base]],
        ["FRAME", frames[state.frame]],
        ["ICON", icons[state.icon]],
        ["DECORATION", decorations[state.decoration]],
        ["COMPETITION", competitions[state.competition]],
        ["FINISH", finishes[state.finish]],
        ["TIER", tier]
    ];

    const container = document.getElementById("designReport");
    if (!container) return;

    container.innerHTML = `
        <div class="report-grid">
            ${items.map(([label, item]) => `
                <div class="report-item">
                    <span>${label}</span>
                    <strong>${esc(item.name)}</strong>
                    <p>${esc(item.visual || item.description)}</p>
                </div>
            `).join("")}
        </div>
    `;
}

function buildInspection() {
    const container = document.getElementById("inspectionPanel");
    if (!container) return;

    const tier = tiers[state.tier];

    container.innerHTML = `
        <div class="inspection-layout">

            <div class="inspection-column">
                <span class="inspection-label">COMPOSITION</span>

                <div class="inspection-row">
                    <span>Base</span>
                    <strong>${esc(bases[state.base].name)}</strong>
                </div>

                <div class="inspection-row">
                    <span>Frame</span>
                    <strong>${esc(frames[state.frame].name)}</strong>
                </div>

                <div class="inspection-row">
                    <span>Icon</span>
                    <strong>${esc(icons[state.icon].name)}</strong>
                </div>

                <div class="inspection-row">
                    <span>Decoration</span>
                    <strong>${esc(decorations[state.decoration].name)}</strong>
                </div>
            </div>

            <div class="inspection-column">
                <span class="inspection-label">IDENTITY</span>

                <div class="inspection-row">
                    <span>Competition</span>
                    <strong>${esc(competitions[state.competition].name)}</strong>
                </div>

                <div class="inspection-row">
                    <span>Finish</span>
                    <strong>${esc(finishes[state.finish].name)}</strong>
                </div>

                <div class="inspection-row">
                    <span>Tier</span>
                    <strong>${esc(tier.name)}</strong>
                </div>

                <div class="inspection-colour">
                    <i style="background:${tier.main}"></i>
                    <span>${tier.main}</span>
                    <i style="background:${tier.bright}"></i>
                    <span>${tier.bright}</span>
                    <i style="background:${tier.dark}"></i>
                    <span>${tier.dark}</span>
                </div>
            </div>

            <div class="inspection-column">
                <span class="inspection-label">LAYER ORDER</span>

                <ol class="layer-list">
                    <li>Badge background</li>
                    <li>Atmospheric glow</li>
                    <li>Base silhouette</li>
                    <li>Decorative layer</li>
                    <li>Outer frame</li>
                    <li>Achievement symbol</li>
                    <li>Competition identity</li>
                    <li>Achievement title</li>
                    <li>Tier label</li>
                </ol>
            </div>

        </div>

        <div class="inspection-description">
            <strong>COMPLETE VISUAL DESCRIPTION</strong>
            <p>
                ${esc(
                    `${bases[state.base].visual} ` +
                    `${frames[state.frame].visual} ` +
                    `${icons[state.icon].visual} ` +
                    `${decorations[state.decoration].visual} ` +
                    `${competitions[state.competition].visual} ` +
                    `${finishes[state.finish].visual} ` +
                    `${tier.description}.`
                )}
            </p>
        </div>
    `;
}

function updateSummary() {
    const values = {
        selectedBase: bases[state.base].name,
        selectedFrame: frames[state.frame].name,
        selectedIcon: icons[state.icon].name,
        selectedDecoration: decorations[state.decoration].name,
        selectedCompetition: competitions[state.competition].name,
        selectedFinish: finishes[state.finish].name,
        selectedTier: tiers[state.tier].name
    };

    Object.entries(values).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

function render() {
    const badgeStage = document.getElementById("badgeStage");

    if (badgeStage) {
        badgeStage.innerHTML = renderCompleteBadge();
    }

    buildOptions("baseOptions", bases, "base");
    buildOptions("frameOptions", frames, "frame");
    buildOptions("iconOptions", icons, "icon");
    buildOptions("decorationOptions", decorations, "decoration");
    buildOptions("competitionOptions", competitions, "competition");
    buildOptions("finishOptions", finishes, "finish");

    buildTiers();

    buildGallery("baseGallery", "base", bases);
    buildGallery("frameGallery", "frame", frames);
    buildGallery("iconGallery", "icon", icons);
    buildGallery("decorationGallery", "decoration", decorations);
    buildGallery("competitionGallery", "competition", competitions);
    buildGallery("finishGallery", "finish", finishes);

    updateSummary();
    buildDesignReport();
    buildInspection();
}

document.addEventListener("click", event => {
    const option = event.target.closest("[data-type][data-key]");
    if (!option) return;

    const type = option.dataset.type;

    if (
        type === "base" ||
        type === "frame" ||
        type === "icon" ||
        type === "decoration" ||
        type === "competition" ||
        type === "finish" ||
        type === "tier"
    ) {
        state[type] = option.dataset.key;
        render();
    }
});

const resetButton = document.getElementById("resetButton");

if (resetButton) {
    resetButton.addEventListener("click", () => {
        state.base = "shield";
        state.frame = "classic";
        state.icon = "trophy";
        state.decoration = "stars";
        state.competition = "handicap";
        state.finish = "metal";
        state.tier = "legendary";
        render();
    });
}

// ========================================
// BASES
// ========================================

function renderShield(tier) {
    return `
        <g data-layer="base">
            <path
                d="M80 65 L220 65 L220 180 Q220 260 150 295 Q80 260 80 180 Z"
                fill="url(#badgeBackground)"
                stroke="${tier.main}"
                stroke-width="8"/>

            <path
                d="M98 82 L202 82 L202 178 Q202 238 150 266 Q98 238 98 178 Z"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="3"
                opacity=".75"/>
        </g>
    `;
}

function renderCrest(tier) {
    return `
        <g data-layer="base">
            <path
                d="M75 65 L225 65 L242 155 Q235 245 150 295 Q65 245 58 155 Z"
                fill="url(#badgeBackground)"
                stroke="${tier.main}"
                stroke-width="8"/>

            <path
                d="M94 83 L206 83 L219 155 Q212 225 150 267 Q88 225 81 155 Z"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="3"
                opacity=".75"/>
        </g>
    `;
}

function renderMedal(tier) {
    return `
        <g data-layer="base">
            <circle
                cx="150"
                cy="165"
                r="112"
                fill="url(#badgeBackground)"
                stroke="${tier.main}"
                stroke-width="9"/>

            <circle
                cx="150"
                cy="165"
                r="89"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="3"/>

            <circle
                cx="150"
                cy="165"
                r="76"
                fill="none"
                stroke="${tier.dark}"
                stroke-width="3"/>
        </g>
    `;
}

function renderHexagon(tier) {
    return `
        <g data-layer="base">
            <polygon
                points="150,52 245,107 245,217 150,272 55,217 55,107"
                fill="url(#badgeBackground)"
                stroke="${tier.main}"
                stroke-width="8"/>

            <polygon
                points="150,72 225,116 225,208 150,252 75,208 75,116"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="3"/>
        </g>
    `;
}

function renderDiamond(tier) {
    return `
        <g data-layer="base">
            <path
                d="M150 45 L252 165 L150 285 L48 165 Z"
                fill="url(#badgeBackground)"
                stroke="${tier.main}"
                stroke-width="8"/>

            <path
                d="M150 70 L227 165 L150 260 L73 165 Z"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="3"/>
        </g>
    `;
}

function renderRibbon(tier) {
    return `
        <g data-layer="base">
            <path
                d="M65 65 L235 65 L218 235 L150 285 L82 235 Z"
                fill="url(#badgeBackground)"
                stroke="${tier.main}"
                stroke-width="8"/>

            <path
                d="M84 85 L216 85 L202 222 L150 260 L98 222 Z"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="3"/>
        </g>
    `;
}

// ========================================
// FRAMES
// ========================================

function renderClassicFrame(tier) {
    return `
        <g data-layer="frame">
            <rect
                x="48"
                y="30"
                width="504"
                height="640"
                rx="34"
                fill="none"
                stroke="${tier.main}"
                stroke-width="6"/>

            <rect
                x="64"
                y="46"
                width="472"
                height="608"
                rx="25"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="2"
                opacity=".7"/>
        </g>
    `;
}

function renderHeavyFrame(tier) {
    return `
        <g data-layer="frame">
            <rect
                x="43"
                y="25"
                width="514"
                height="650"
                rx="35"
                fill="none"
                stroke="${tier.dark}"
                stroke-width="20"/>

            <rect
                x="57"
                y="39"
                width="486"
                height="622"
                rx="27"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="4"/>
        </g>
    `;
}

function renderDoubleFrame(tier) {
    return `
        <g data-layer="frame">
            <rect
                x="40"
                y="25"
                width="520"
                height="650"
                rx="38"
                fill="none"
                stroke="${tier.main}"
                stroke-width="5"/>

            <rect
                x="57"
                y="42"
                width="486"
                height="616"
                rx="29"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="4"/>

            <rect
                x="73"
                y="58"
                width="454"
                height="584"
                rx="22"
                fill="none"
                stroke="${tier.dark}"
                stroke-width="2"/>
        </g>
    `;
}

function renderAngularFrame(tier) {
    return `
        <g data-layer="frame">
            <path
                d="M55 25 H545 L575 55 V645 L545 675 H55 L25 645 V55 Z"
                fill="none"
                stroke="${tier.main}"
                stroke-width="7"/>

            <path
                d="M72 43 H528 L557 72 V628 L528 657 H72 L43 628 V72 Z"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="2"/>
        </g>
    `;
}

function renderOrnateFrame(tier) {
    return `
        <g data-layer="frame">
            <rect
                x="45"
                y="25"
                width="510"
                height="650"
                rx="35"
                fill="none"
                stroke="${tier.dark}"
                stroke-width="15"/>

            <rect
                x="58"
                y="38"
                width="484"
                height="624"
                rx="27"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="3"/>

            <circle cx="58" cy="38" r="10" fill="${tier.main}"/>
            <circle cx="542" cy="38" r="10" fill="${tier.main}"/>
            <circle cx="58" cy="662" r="10" fill="${tier.main}"/>
            <circle cx="542" cy="662" r="10" fill="${tier.main}"/>
        </g>
    `;
}

// ========================================
// ICONS
// ========================================

function renderTrophy(tier) {
    return `
        <g data-layer="icon" transform="translate(225 105)">
            <path
                d="M35 25 H115 L108 102 Q75 140 42 102 Z"
                fill="url(#metal)"
                stroke="${tier.bright}"
                stroke-width="3"/>

            <path
                d="M35 42 H7 Q7 98 45 102"
                fill="none"
                stroke="${tier.main}"
                stroke-width="11"/>

            <path
                d="M115 42 H143 Q143 98 105 102"
                fill="none"
                stroke="${tier.main}"
                stroke-width="11"/>

            <path
                d="M75 140 V168"
                stroke="${tier.main}"
                stroke-width="11"/>

            <path
                d="M43 175 H107"
                stroke="${tier.bright}"
                stroke-width="9"/>
        </g>
    `;
}

function renderCrown(tier) {
    return `
        <g data-layer="icon">
            <path
                d="M75 225 L90 120 L135 172 L150 90 L165 172 L210 120 L225 225 Z"
                fill="url(#metal)"
                stroke="${tier.bright}"
                stroke-width="4"/>

            <path
                d="M83 225 H217 L208 248 H92 Z"
                fill="${tier.dark}"
                stroke="${tier.main}"
                stroke-width="3"/>
        </g>
    `;
}

function renderStar(tier) {
    return `
        <g data-layer="icon">
            <polygon
                points="150,55 169,111 228,114 181,150 197,209 150,176 103,209 119,150 72,114 131,111"
                fill="url(#metal)"
                stroke="${tier.bright}"
                stroke-width="4"/>
        </g>
    `;
}

function renderBall(tier) {
    return `
        <g data-layer="icon">
            <circle
                cx="150"
                cy="165"
                r="82"
                fill="#0e1422"
                stroke="${tier.main}"
                stroke-width="8"/>

            <path
                d="M102 117 Q165 137 204 197"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="5"/>

            <path
                d="M95 198 Q150 148 208 130"
                fill="none"
                stroke="${tier.dark}"
                stroke-width="5"/>
        </g>
    `;
}

function renderTarget(tier) {
    return `
        <g data-layer="icon">
            <circle
                cx="150"
                cy="165"
                r="92"
                fill="none"
                stroke="${tier.dark}"
                stroke-width="18"/>

            <circle
                cx="150"
                cy="165"
                r="63"
                fill="none"
                stroke="${tier.main}"
                stroke-width="15"/>

            <circle
                cx="150"
                cy="165"
                r="30"
                fill="${tier.bright}"/>
        </g>
    `;
}

function renderLightning(tier) {
    return `
        <g data-layer="icon">
            <path
                d="M178 65 L77 174 H140 L112 265 L223 123 H160 Z"
                fill="url(#metal)"
                stroke="${tier.bright}"
                stroke-width="4"/>
        </g>
    `;
}

function renderNumber(tier) {
    return `
        <g data-layer="icon">
            <text
                x="150"
                y="215"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="150"
                font-weight="bold"
                fill="url(#metal)"
                stroke="${tier.bright}"
                stroke-width="2">
                50
            </text>
        </g>
    `;
}

function renderCrownStar(tier) {
    return `
        <g data-layer="icon">
            ${renderStar(tier)}

            <path
                d="M100 245 L110 210 L130 230 L150 195 L170 230 L190 210 L200 245 Z"
                fill="${tier.main}"
                stroke="${tier.bright}"
                stroke-width="2"/>
        </g>
    `;
}

// ========================================
// DECORATIONS
// ========================================

function renderStars(tier) {
    return `
        <g data-layer="decoration" fill="${tier.bright}">
            <circle cx="100" cy="120" r="6"/>
            <circle cx="125" cy="96" r="4"/>
            <circle cx="200" cy="120" r="6"/>
            <circle cx="175" cy="96" r="4"/>
        </g>
    `;
}

function renderRays(tier) {
    return `
        <g data-layer="decoration"
            stroke="${tier.main}"
            stroke-width="4"
            opacity=".75">

            <path d="M92 130 L52 102"/>
            <path d="M76 165 L30 150"/>
            <path d="M208 130 L248 102"/>
            <path d="M224 165 L270 150"/>
        </g>
    `;
}

function renderLaurels(tier) {
    return `
        <g data-layer="decoration">
            <path
                d="M105 250 Q62 170 105 90"
                fill="none"
                stroke="${tier.main}"
                stroke-width="8"/>

            <path
                d="M195 250 Q238 170 195 90"
                fill="none"
                stroke="${tier.main}"
                stroke-width="8"/>

            <g fill="${tier.bright}">
                <ellipse cx="89" cy="215" rx="18" ry="7" transform="rotate(35 89 215)"/>
                <ellipse cx="77" cy="177" rx="18" ry="7" transform="rotate(18 77 177)"/>
                <ellipse cx="81" cy="136" rx="18" ry="7" transform="rotate(-10 81 136)"/>

                <ellipse cx="211" cy="215" rx="18" ry="7" transform="rotate(-35 211 215)"/>
                <ellipse cx="223" cy="177" rx="18" ry="7" transform="rotate(-18 223 177)"/>
                <ellipse cx="219" cy="136" rx="18" ry="7" transform="rotate(10 219 136)"/>
            </g>
        </g>
    `;
}

function renderCorners(tier) {
    return `
        <g data-layer="decoration" fill="${tier.main}">
            <path d="M45 45 H95 V53 H53 V95 H45 Z"/>
            <path d="M255 45 H205 V53 H247 V95 H255 Z"/>
            <path d="M45 255 H95 V247 H53 V205 H45 Z"/>
            <path d="M255 255 H205 V247 H247 V205 H255 Z"/>
        </g>
    `;
}

function renderDots(tier) {
    return `
        <g data-layer="decoration" fill="${tier.main}">
            <circle cx="75" cy="75" r="6"/>
            <circle cx="101" cy="75" r="3"/>
            <circle cx="225" cy="75" r="6"/>
            <circle cx="199" cy="75" r="3"/>
            <circle cx="75" cy="225" r="6"/>
            <circle cx="101" cy="225" r="3"/>
            <circle cx="225" cy="225" r="6"/>
            <circle cx="199" cy="225" r="3"/>
        </g>
    `;
}

// ========================================
// COMPETITION IDENTITY
// ========================================

function renderHandicapIdentity(tier) {
    return `
        <g data-layer="competition">
            <circle
                cx="300"
                cy="365"
                r="34"
                fill="none"
                stroke="${tier.main}"
                stroke-width="3"
                opacity=".75"/>

            <text
                x="300"
                y="371"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="10"
                font-weight="bold"
                letter-spacing="2"
                fill="${tier.bright}">
                WH
            </text>
        </g>
    `;
}

function renderSLTCIdentity(tier) {
    return `
        <g data-layer="competition"
            fill="none"
            stroke="${tier.main}"
            stroke-width="5">

            <path d="M260 360 L300 335 L340 360"/>
            <path d="M260 380 L300 355 L340 380"/>
        </g>
    `;
}

function renderGenerationIdentity(tier) {
    return `
        <g data-layer="competition">
            <circle
                cx="300"
                cy="360"
                r="34"
                fill="none"
                stroke="${tier.main}"
                stroke-width="3"/>

            <circle
                cx="300"
                cy="360"
                r="22"
                fill="none"
                stroke="${tier.bright}"
                stroke-width="2"/>
        </g>
    `;
}

function renderJuniorIdentity(tier) {
    return `
        <g data-layer="competition">
            <path
                d="M275 360 Q300 335 325 360 Q300 385 275 360 Z"
                fill="none"
                stroke="${tier.main}"
                stroke-width="4"/>
        </g>
    `;
}

function renderRacketballIdentity(tier) {
    return `
        <g data-layer="competition">
            <circle
                cx="300"
                cy="360"
                r="30"
                fill="none"
                stroke="${tier.main}"
                stroke-width="4"/>

            <path
                d="M280 340 Q300 360 320 380"
                stroke="${tier.bright}"
                stroke-width="3"
                fill="none"/>
        </g>
    `;
}

function renderBoxLeagueIdentity(tier) {
    return `
        <g data-layer="competition"
            fill="none"
            stroke="${tier.main}"
            stroke-width="3">

            <rect x="275" y="340" width="20" height="20"/>
            <rect x="300" y="340" width="20" height="20"/>
            <rect x="275" y="365" width="20" height="20"/>
            <rect x="300" y="365" width="20" height="20"/>
        </g>
    `;
}

// ========================================
// FINISHES
// ========================================

function renderMetalFinish(tier) {
    return `
        <stop offset="0%" stop-color="${tier.bright}"/>
        <stop offset="25%" stop-color="${tier.main}"/>
        <stop offset="55%" stop-color="${tier.dark}"/>
        <stop offset="78%" stop-color="${tier.main}"/>
        <stop offset="100%" stop-color="#111528"/>
    `;
}

function renderEnamelFinish(tier) {
    return `
        <stop offset="0%" stop-color="${tier.bright}"/>
        <stop offset="22%" stop-color="${tier.main}"/>
        <stop offset="100%" stop-color="${tier.dark}"/>
    `;
}

function renderGlassFinish(tier) {
    return `
        <stop offset="0%" stop-color="#ffffff" stop-opacity=".75"/>
        <stop offset="18%" stop-color="${tier.bright}" stop-opacity=".55"/>
        <stop offset="50%" stop-color="${tier.main}" stop-opacity=".3"/>
        <stop offset="100%" stop-color="${tier.dark}" stop-opacity=".55"/>
    `;
}

function renderStoneFinish(tier) {
    return `
        <stop offset="0%" stop-color="#626a7d"/>
        <stop offset="25%" stop-color="${tier.dark}"/>
        <stop offset="70%" stop-color="#202637"/>
        <stop offset="100%" stop-color="#0d111d"/>
    `;
}

// ========================================
// INITIALISE
// ========================================

render();
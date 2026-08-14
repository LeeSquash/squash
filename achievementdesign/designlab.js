// ========================================
// FILE: /squash/achievementdesign/designlab.js
// ACHIEVEMENT DESIGN LAB
// Standalone visual design playground
// Every SVG module is rendered independently
// so the design can be inspected and developed.
// ========================================

const state = {
    base: "shield",
    frame: "classic",
    icon: "trophy",
    decoration: "stars",
    tier: "legendary"
};

const tiers = {
    easy: {
        name: "Easy",
        main: "#58b879",
        bright: "#a7e4bc",
        dark: "#24613d"
    },
    medium: {
        name: "Medium",
        main: "#4e9fd1",
        bright: "#a9dcf5",
        dark: "#225474"
    },
    hard: {
        name: "Hard",
        main: "#9365d5",
        bright: "#d3b6f4",
        dark: "#51328a"
    },
    epic: {
        name: "Epic",
        main: "#d56d42",
        bright: "#ffc0a1",
        dark: "#87371f"
    },
    legendary: {
        name: "Legendary",
        main: "#d7a936",
        bright: "#fff0a9",
        dark: "#81540d"
    }
};

const bases = {
    shield: {
        name: "Shield",
        description: "Classic competitive silhouette",
        render: renderShield
    },
    medal: {
        name: "Medal",
        description: "Circular achievement form",
        render: renderMedal
    },
    crest: {
        name: "Crest",
        description: "Traditional club identity",
        render: renderCrest
    },
    hexagon: {
        name: "Hexagon",
        description: "Modern angular form",
        render: renderHexagon
    },
    diamond: {
        name: "Diamond",
        description: "Sharp premium silhouette",
        render: renderDiamond
    },
    ribbon: {
        name: "Ribbon",
        description: "Award-style presentation",
        render: renderRibbon
    }
};

const frames = {
    classic: {
        name: "Classic",
        description: "Clean double border",
        render: renderClassicFrame
    },
    heavy: {
        name: "Heavy",
        description: "Strong championship border",
        render: renderHeavyFrame
    },
    double: {
        name: "Double",
        description: "Layered inner border",
        render: renderDoubleFrame
    },
    angular: {
        name: "Angular",
        description: "Geometric technical frame",
        render: renderAngularFrame
    },
    ornate: {
        name: "Ornate",
        description: "Decorative premium frame",
        render: renderOrnateFrame
    },
    none: {
        name: "None",
        description: "No outer frame",
        render: () => ""
    }
};

const icons = {
    trophy: {
        name: "Trophy",
        description: "Championship symbol",
        render: renderTrophy
    },
    crown: {
        name: "Crown",
        description: "Elite achievement",
        render: renderCrown
    },
    star: {
        name: "Star",
        description: "Achievement marker",
        render: renderStar
    },
    ball: {
        name: "Squash Ball",
        description: "Squash identity",
        render: renderBall
    },
    target: {
        name: "Target",
        description: "Precision achievement",
        render: renderTarget
    },
    lightning: {
        name: "Lightning",
        description: "Speed and streaks",
        render: renderLightning
    },
    number: {
        name: "Number",
        description: "Milestone marker",
        render: renderNumber
    },
    crownstar: {
        name: "Crown Star",
        description: "Elite combination",
        render: renderCrownStar
    }
};

const decorations = {
    stars: {
        name: "Stars",
        description: "Small achievement stars",
        render: renderStars
    },
    rays: {
        name: "Rays",
        description: "Energy and impact",
        render: renderRays
    },
    laurels: {
        name: "Laurels",
        description: "Traditional victory",
        render: renderLaurels
    },
    corners: {
        name: "Corners",
        description: "Geometric accents",
        render: renderCorners
    },
    dots: {
        name: "Dots",
        description: "Minimal detailing",
        render: renderDots
    },
    none: {
        name: "None",
        description: "No decoration",
        render: () => ""
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

function svgDefs(tier) {
    return `
        <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#202942"/>
                <stop offset="55%" stop-color="#11172b"/>
                <stop offset="100%" stop-color="#080b15"/>
            </linearGradient>
            <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${tier.bright}"/>
                <stop offset="28%" stop-color="${tier.main}"/>
                <stop offset="65%" stop-color="${tier.dark}"/>
                <stop offset="100%" stop-color="#111528"/>
            </linearGradient>
            <radialGradient id="glow">
                <stop offset="0%" stop-color="${tier.bright}" stop-opacity=".3"/>
                <stop offset="100%" stop-color="${tier.main}" stop-opacity="0"/>
            </radialGradient>
            <filter id="shadow">
                <feDropShadow dx="0" dy="12" stdDeviation="12" flood-opacity=".55"/>
            </filter>
            <filter id="softGlow">
                <feGaussianBlur stdDeviation="8"/>
            </filter>
        </defs>
    `;
}

function renderBadge() {
    const tier = tiers[state.tier];

    return `
        <svg viewBox="0 0 600 700"
            xmlns="http://www.w3.org/2000/svg"
            data-design-lab="live-badge"
            role="img"
            aria-label="Live achievement badge preview">

            ${svgDefs(tier)}

            <rect width="600" height="700" fill="transparent"/>
            <ellipse cx="300" cy="320" rx="230" ry="250"
                fill="url(#glow)"
                filter="url(#softGlow)"/>

            ${bases[state.base].render(tier)}
            ${decorations[state.decoration].render(tier)}
            ${frames[state.frame].render(tier)}
            ${icons[state.icon].render(tier)}

            <text x="300" y="520"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="31"
                font-weight="bold"
                letter-spacing="3"
                fill="#fff">
                CHAMPION
            </text>

            <text x="300" y="553"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="15"
                font-weight="bold"
                letter-spacing="4"
                fill="${tier.bright}">
                WEDNESDAY HANDICAP
            </text>

            <text x="300" y="590"
                text-anchor="middle"
                font-family="Arial, sans-serif"
                font-size="13"
                letter-spacing="3"
                fill="#858da3">
                ${tier.name.toUpperCase()}
            </text>
        </svg>
    `;
}

function renderStandalone(type, key, renderer) {
    const tier = tiers[state.tier];

    return `
        <div class="module-card"
            data-module-type="${type}"
            data-module="${key}">

            <div class="module-preview">
                <svg viewBox="0 0 300 300"
                    xmlns="http://www.w3.org/2000/svg"
                    data-design-lab="${type}"
                    data-module="${key}"
                    role="img"
                    aria-label="${esc(getModuleName(type, key))} module preview">

                    ${svgDefs(tier)}
                    ${renderer(tier, true)}
                </svg>
            </div>

            <strong>${esc(getModuleName(type, key))}</strong>

            <span class="module-description">
                ${esc(getModuleDescription(type, key))}
            </span>
        </div>
    `;
}

function getModuleName(type, key) {
    if (type === "base") return bases[key].name;
    if (type === "frame") return frames[key].name;
    if (type === "icon") return icons[key].name;
    return decorations[key].name;
}

function getModuleDescription(type, key) {
    if (type === "base") return bases[key].description;
    if (type === "frame") return frames[key].description;
    if (type === "icon") return icons[key].description;
    return decorations[key].description;
}

function buildOptions(containerId, data, type) {
    const container = document.getElementById(containerId);

    container.innerHTML = Object.entries(data).map(([key, item]) => `
        <button
            class="option ${state[type] === key ? "active" : ""}"
            data-type="${type}"
            data-key="${key}">
            <span class="option-name">${esc(item.name)}</span>
            <span class="option-description">${esc(item.description)}</span>
        </button>
    `).join("");
}

function buildTiers() {
    document.getElementById("tierOptions").innerHTML =
        Object.entries(tiers).map(([key, tier]) => `
            <button
                class="tier-option ${state.tier === key ? "active" : ""}"
                data-type="tier"
                data-key="${key}">
                ${tier.name.toUpperCase()}
            </button>
        `).join("");
}

function buildGallery() {
    document.getElementById("baseGallery").innerHTML =
        Object.entries(bases)
            .map(([key, item]) =>
                renderStandalone("base", key, item.render)
            ).join("");

    document.getElementById("frameGallery").innerHTML =
        Object.entries(frames)
            .map(([key, item]) =>
                renderStandalone("frame", key, item.render)
            ).join("");

    document.getElementById("iconGallery").innerHTML =
        Object.entries(icons)
            .map(([key, item]) =>
                renderStandalone("icon", key, item.render)
            ).join("");

    document.getElementById("decorationGallery").innerHTML =
        Object.entries(decorations)
            .map(([key, item]) =>
                renderStandalone("decoration", key, item.render)
            ).join("");
}

function updateSummary() {
    document.getElementById("selectedBase").textContent =
        bases[state.base].name;

    document.getElementById("selectedFrame").textContent =
        frames[state.frame].name;

    document.getElementById("selectedIcon").textContent =
        icons[state.icon].name;

    document.getElementById("selectedDecoration").textContent =
        decorations[state.decoration].name;

    document.getElementById("selectedTier").textContent =
        tiers[state.tier].name;
}

function render() {
    document.getElementById("badgeStage").innerHTML = renderBadge();

    buildOptions("baseOptions", bases, "base");
    buildOptions("frameOptions", frames, "frame");
    buildOptions("iconOptions", icons, "icon");
    buildOptions("decorationOptions", decorations, "decoration");
    buildTiers();
    buildGallery();
    updateSummary();
}

document.addEventListener("click", event => {
    const option = event.target.closest("[data-type]");
    if (!option) return;

    state[option.dataset.type] = option.dataset.key;
    render();
});

document.getElementById("resetButton").addEventListener("click", () => {
    state.base = "shield";
    state.frame = "classic";
    state.icon = "trophy";
    state.decoration = "stars";
    state.tier = "legendary";
    render();
});

// ========================================
// BASES
// ========================================

function renderShield(tier) {
    return `
        <path
            d="M90 45 L210 45 L210 165 Q210 230 150 260 Q90 230 90 165 Z"
            fill="url(#bg)"
            stroke="${tier.main}"
            stroke-width="6"/>

        <path
            d="M105 60 L195 60 L195 160 Q195 210 150 235 Q105 210 105 160 Z"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"
            opacity=".7"/>
    `;
}

function renderMedal(tier) {
    return `
        <circle
            cx="300"
            cy="300"
            r="205"
            fill="url(#bg)"
            stroke="${tier.main}"
            stroke-width="8"/>

        <circle
            cx="300"
            cy="300"
            r="180"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"
            opacity=".7"/>
    `;
}

function renderCrest(tier) {
    return `
        <path
            d="M90 55 L210 55 L225 135 Q220 220 150 260 Q80 220 75 135 Z"
            fill="url(#bg)"
            stroke="${tier.main}"
            stroke-width="7"/>

        <path
            d="M105 70 L195 70 L207 135 Q200 200 150 230 Q100 200 93 135 Z"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"/>
    `;
}

function renderHexagon(tier) {
    return `
        <polygon
            points="150,45 235,95 235,195 150,245 65,195 65,95"
            fill="url(#bg)"
            stroke="${tier.main}"
            stroke-width="7"/>

        <polygon
            points="150,62 216,101 216,189 150,228 84,189 84,101"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"/>
    `;
}

function renderDiamond(tier) {
    return `
        <path
            d="M150 40 L245 150 L150 260 L55 150 Z"
            fill="url(#bg)"
            stroke="${tier.main}"
            stroke-width="7"/>

        <path
            d="M150 60 L225 150 L150 240 L75 150 Z"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"/>
    `;
}

function renderRibbon(tier) {
    return `
        <path
            d="M75 75 L225 75 L210 220 L150 260 L90 220 Z"
            fill="url(#bg)"
            stroke="${tier.main}"
            stroke-width="7"/>

        <path
            d="M90 95 L210 95 L198 205 L150 235 L102 205 Z"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"/>
    `;
}

// ========================================
// FRAMES
// ========================================

function renderClassicFrame(tier) {
    return `
        <rect
            x="65"
            y="40"
            width="470"
            height="620"
            rx="28"
            fill="none"
            stroke="${tier.main}"
            stroke-width="5"/>

        <rect
            x="78"
            y="53"
            width="444"
            height="594"
            rx="20"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"
            opacity=".6"/>
    `;
}

function renderHeavyFrame(tier) {
    return `
        <rect
            x="55"
            y="30"
            width="490"
            height="640"
            rx="30"
            fill="none"
            stroke="${tier.dark}"
            stroke-width="18"/>

        <rect
            x="66"
            y="41"
            width="468"
            height="618"
            rx="23"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="3"/>
    `;
}

function renderDoubleFrame(tier) {
    return `
        <rect
            x="48"
            y="28"
            width="504"
            height="644"
            rx="35"
            fill="none"
            stroke="${tier.main}"
            stroke-width="4"/>

        <rect
            x="67"
            y="47"
            width="466"
            height="606"
            rx="26"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="4"/>

        <rect
            x="82"
            y="62"
            width="436"
            height="576"
            rx="20"
            fill="none"
            stroke="${tier.dark}"
            stroke-width="2"/>
    `;
}

function renderAngularFrame(tier) {
    return `
        <path
            d="M65 35 L535 35 L565 65 L565 635 L535 665 L65 665 L35 635 L35 65 Z"
            fill="none"
            stroke="${tier.main}"
            stroke-width="6"/>

        <path
            d="M80 52 L520 52 L548 80 L548 620 L520 648 L80 648 L52 620 L52 80 Z"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="2"/>
    `;
}

function renderOrnateFrame(tier) {
    return `
        <rect
            x="50"
            y="30"
            width="500"
            height="640"
            rx="32"
            fill="none"
            stroke="${tier.dark}"
            stroke-width="14"/>

        <rect
            x="62"
            y="42"
            width="476"
            height="616"
            rx="25"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="3"/>

        <circle cx="62" cy="42" r="9" fill="${tier.main}"/>
        <circle cx="538" cy="42" r="9" fill="${tier.main}"/>
        <circle cx="62" cy="658" r="9" fill="${tier.main}"/>
        <circle cx="538" cy="658" r="9" fill="${tier.main}"/>
    `;
}

// ========================================
// ICONS
// ========================================

function renderTrophy(tier) {
    return `
        <g transform="translate(225 120)">
            <path
                d="M35 30 L125 30 L115 105 Q80 145 45 105 Z"
                fill="url(#metal)"
                stroke="${tier.bright}"
                stroke-width="3"/>

            <path
                d="M35 45 H8 Q8 105 48 105"
                fill="none"
                stroke="${tier.main}"
                stroke-width="12"/>

            <path
                d="M125 45 H152 Q152 105 112 105"
                fill="none"
                stroke="${tier.main}"
                stroke-width="12"/>

            <path
                d="M80 145 V175"
                stroke="${tier.main}"
                stroke-width="12"/>

            <path
                d="M48 182 H112"
                stroke="${tier.bright}"
                stroke-width="9"/>
        </g>
    `;
}

function renderCrown(tier) {
    return `
        <path
            d="M205 225 L220 125 L265 175 L300 105 L335 175 L380 125 L395 225 Z"
            fill="url(#metal)"
            stroke="${tier.bright}"
            stroke-width="4"/>

        <path
            d="M215 225 H385 L375 245 H225 Z"
            fill="${tier.dark}"
            stroke="${tier.main}"
            stroke-width="3"/>
    `;
}

function renderStar(tier) {
    return `
        <polygon
            points="300,110 320,165 380,168 333,203 348,260 300,228 252,260 267,203 220,168 280,165"
            fill="url(#metal)"
            stroke="${tier.bright}"
            stroke-width="4"/>
    `;
}

function renderBall(tier) {
    return `
        <circle
            cx="300"
            cy="190"
            r="78"
            fill="#101522"
            stroke="${tier.main}"
            stroke-width="8"/>

        <path
            d="M255 145 Q315 165 350 225"
            fill="none"
            stroke="${tier.bright}"
            stroke-width="5"/>

        <path
            d="M245 220 Q300 175 355 160"
            fill="none"
            stroke="${tier.dark}"
            stroke-width="5"/>
    `;
}

function renderTarget(tier) {
    return `
        <circle
            cx="300"
            cy="190"
            r="90"
            fill="none"
            stroke="${tier.dark}"
            stroke-width="18"/>

        <circle
            cx="300"
            cy="190"
            r="62"
            fill="none"
            stroke="${tier.main}"
            stroke-width="15"/>

        <circle
            cx="300"
            cy="190"
            r="30"
            fill="${tier.bright}"/>
    `;
}

function renderLightning(tier) {
    return `
        <path
            d="M325 90 L230 205 H290 L265 285 L370 155 H310 Z"
            fill="url(#metal)"
            stroke="${tier.bright}"
            stroke-width="4"/>
    `;
}

function renderNumber(tier) {
    return `
        <text
            x="300"
            y="235"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="145"
            font-weight="bold"
            fill="url(#metal)"
            stroke="${tier.bright}"
            stroke-width="2">
            50
        </text>
    `;
}

function renderCrownStar(tier) {
    return `
        ${renderStar(tier)}

        <path
            d="M250 240 L260 205 L280 225 L300 190 L320 225 L340 205 L350 240 Z"
            fill="${tier.main}"
            stroke="${tier.bright}"
            stroke-width="2"/>
    `;
}

// ========================================
// DECORATIONS
// ========================================

function renderStars(tier) {
    return `
        <g fill="${tier.bright}">
            <circle cx="100" cy="115" r="5"/>
            <circle cx="125" cy="95" r="3"/>
            <circle cx="500" cy="115" r="5"/>
            <circle cx="475" cy="95" r="3"/>
            <circle cx="105" cy="555" r="4"/>
            <circle cx="495" cy="555" r="4"/>
        </g>
    `;
}

function renderRays(tier) {
    return `
        <g stroke="${tier.main}" stroke-width="3" opacity=".7">
            <path d="M110 130 L75 105"/>
            <path d="M95 160 L55 150"/>
            <path d="M490 130 L525 105"/>
            <path d="M505 160 L545 150"/>
            <path d="M110 510 L75 535"/>
            <path d="M490 510 L525 535"/>
        </g>
    `;
}

function renderLaurels(tier) {
    return `
        <path
            d="M105 470 Q65 400 105 330"
            fill="none"
            stroke="${tier.main}"
            stroke-width="8"/>

        <path
            d="M495 470 Q535 400 495 330"
            fill="none"
            stroke="${tier.main}"
            stroke-width="8"/>

        <g fill="${tier.bright}">
            <ellipse cx="91" cy="440" rx="18" ry="7" transform="rotate(35 91 440)"/>
            <ellipse cx="80" cy="405" rx="18" ry="7" transform="rotate(20 80 405)"/>
            <ellipse cx="83" cy="365" rx="18" ry="7" transform="rotate(-10 83 365)"/>
            <ellipse cx="509" cy="440" rx="18" ry="7" transform="rotate(-35 509 440)"/>
            <ellipse cx="520" cy="405" rx="18" ry="7" transform="rotate(-20 520 405)"/>
            <ellipse cx="517" cy="365" rx="18" ry="7" transform="rotate(10 517 365)"/>
        </g>
    `;
}

function renderCorners(tier) {
    return `
        <g fill="${tier.main}">
            <path d="M80 80 H135 V88 H88 V135 H80 Z"/>
            <path d="M520 80 H465 V88 H512 V135 H520 Z"/>
            <path d="M80 620 H135 V612 H88 V565 H80 Z"/>
            <path d="M520 620 H465 V612 H512 V565 H520 Z"/>
        </g>
    `;
}

function renderDots(tier) {
    return `
        <g fill="${tier.main}">
            <circle cx="120" cy="110" r="5"/>
            <circle cx="145" cy="110" r="3"/>
            <circle cx="480" cy="110" r="5"/>
            <circle cx="455" cy="110" r="3"/>
            <circle cx="120" cy="590" r="5"/>
            <circle cx="145" cy="590" r="3"/>
            <circle cx="480" cy="590" r="5"/>
            <circle cx="455" cy="590" r="3"/>
        </g>
    `;
}

render();
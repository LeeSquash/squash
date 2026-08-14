// ========================================
// FILE: /squash/achievementdesign/designlab.js
// ACHIEVEMENT DESIGN LAB
// Visual + machine-readable SVG design system
// ========================================

const state = {
    base: "shield",
    frame: "classic",
    icon: "trophy",
    decoration: "stars",
    tier: "legendary"
};

const tiers = {
    easy: { name: "Easy", main: "#58b879", bright: "#a7e4bc", dark: "#24613d" },
    medium: { name: "Medium", main: "#4e9fd1", bright: "#a9dcf5", dark: "#225474" },
    hard: { name: "Hard", main: "#9365d5", bright: "#d3b6f4", dark: "#51328a" },
    epic: { name: "Epic", main: "#d56d42", bright: "#ffc0a1", dark: "#87371f" },
    legendary: { name: "Legendary", main: "#d7a936", bright: "#fff0a9", dark: "#81540d" }
};

const bases = {
    shield: {
        name: "Shield",
        description: "Tall competitive shield with inset border.",
        visual: "A vertical shield silhouette with a flat upper edge, curved shoulders and a pointed lower section.",
        render: renderShield
    },
    medal: {
        name: "Medal",
        description: "Circular medal with concentric border.",
        visual: "A large circular medal with a dark centre and two concentric metallic rings.",
        render: renderMedal
    },
    crest: {
        name: "Crest",
        description: "Traditional club crest silhouette.",
        visual: "A formal heraldic crest with broad shoulders and a rounded pointed bottom.",
        render: renderCrest
    },
    hexagon: {
        name: "Hexagon",
        description: "Modern six-sided achievement shape.",
        visual: "A strong geometric hexagonal badge with an inset hexagonal border.",
        render: renderHexagon
    },
    diamond: {
        name: "Diamond",
        description: "Angular premium silhouette.",
        visual: "A tall diamond shape with four strong points and an inset diamond.",
        render: renderDiamond
    },
    ribbon: {
        name: "Ribbon",
        description: "Award-style vertical badge.",
        visual: "A ceremonial award shape with a broad top and tapered lower section.",
        render: renderRibbon
    }
};

const frames = {
    classic: {
        name: "Classic",
        description: "Clean double border.",
        visual: "Two rounded rectangular metallic borders around the badge.",
        render: renderClassicFrame
    },
    heavy: {
        name: "Heavy",
        description: "Strong championship border.",
        visual: "A thick dark metallic outer frame with a bright inner highlight.",
        render: renderHeavyFrame
    },
    double: {
        name: "Double",
        description: "Layered triple-line border.",
        visual: "Three progressively smaller borders creating a deep premium frame.",
        render: renderDoubleFrame
    },
    angular: {
        name: "Angular",
        description: "Geometric technical frame.",
        visual: "A chamfered rectangular frame with clipped corners.",
        render: renderAngularFrame
    },
    ornate: {
        name: "Ornate",
        description: "Decorative premium frame.",
        visual: "A thick frame with bright corner ornaments and multiple border layers.",
        render: renderOrnateFrame
    },
    none: {
        name: "None",
        description: "No outer frame.",
        visual: "No framing element.",
        render: () => ""
    }
};

const icons = {
    trophy: {
        name: "Trophy",
        description: "Championship symbol.",
        visual: "A traditional cup trophy with two handles, stem and base.",
        render: renderTrophy
    },
    crown: {
        name: "Crown",
        description: "Elite achievement symbol.",
        visual: "A five-point royal crown rendered as a metallic emblem.",
        render: renderCrown
    },
    star: {
        name: "Star",
        description: "Classic achievement marker.",
        visual: "A large ten-point metallic star.",
        render: renderStar
    },
    ball: {
        name: "Squash Ball",
        description: "Squash identity symbol.",
        visual: "A dark squash ball with curved seam/highlight lines.",
        render: renderBall
    },
    target: {
        name: "Target",
        description: "Precision achievement symbol.",
        visual: "Three concentric target rings with a bright central bullseye.",
        render: renderTarget
    },
    lightning: {
        name: "Lightning",
        description: "Speed and streak symbol.",
        visual: "A sharp angular lightning bolt suggesting speed and energy.",
        render: renderLightning
    },
    number: {
        name: "Number",
        description: "Milestone marker.",
        visual: "A large metallic number used to represent a numerical milestone.",
        render: renderNumber
    },
    crownstar: {
        name: "Crown Star",
        description: "Elite combination symbol.",
        visual: "A large star combined with a smaller crown element.",
        render: renderCrownStar
    }
};

const decorations = {
    stars: {
        name: "Stars",
        description: "Small achievement stars.",
        visual: "Small metallic points positioned around the main badge.",
        render: renderStars
    },
    rays: {
        name: "Rays",
        description: "Energy and impact.",
        visual: "Short diagonal rays radiating from the badge edges.",
        render: renderRays
    },
    laurels: {
        name: "Laurels",
        description: "Traditional victory.",
        visual: "Curved laurel branches with individual leaves on both sides.",
        render: renderLaurels
    },
    corners: {
        name: "Corners",
        description: "Geometric accents.",
        visual: "Small L-shaped metallic corner brackets.",
        render: renderCorners
    },
    dots: {
        name: "Dots",
        description: "Minimal detailing.",
        visual: "Small paired metallic dots used as subtle decoration.",
        render: renderDots
    },
    none: {
        name: "None",
        description: "No decoration.",
        visual: "No decorative element.",
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

function makeSvg(content, title, description, viewBox = "0 0 600 700") {
    return `
        <svg viewBox="${viewBox}"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="svg-title svg-description"
            data-design-lab-svg="true">

            <title id="svg-title">${esc(title)}</title>
            <desc id="svg-description">${esc(description)}</desc>

            ${content}
        </svg>
    `;
}

function renderBadge() {
    const tier = tiers[state.tier];
    const description =
        `${bases[state.base].visual} ` +
        `${frames[state.frame].visual} ` +
        `${icons[state.icon].visual} ` +
        `${decorations[state.decoration].visual} ` +
        `Tier treatment: ${tier.name}.`;

    return makeSvg(`
        ${svgDefs(tier)}
        <rect width="600" height="700" fill="transparent"/>
        <ellipse cx="300" cy="320" rx="230" ry="250" fill="url(#glow)" filter="url(#softGlow)"/>
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
    `, "Complete achievement badge", description);
}

function renderStandalone(type, key, renderer) {
    const tier = tiers[state.tier];
    const item = getCollection(type)[key];
    const title = `${type} module: ${item.name}`;

    return `
        <div class="module-card"
            data-module-type="${type}"
            data-module="${key}">

            <div class="module-preview">
                ${makeSvg(`
                    ${svgDefs(tier)}
                    ${renderer(tier, true)}
                `, title, item.visual, "0 0 300 300")}
            </div>

            <div class="module-name">${esc(item.name)}</div>

            <div class="module-description">
                ${esc(item.description)}
            </div>

            <div class="module-visual">
                <strong>Visual description</strong>
                ${esc(item.visual)}
            </div>

            <details class="svg-inspection">
                <summary>SVG structure</summary>
                <pre>${esc(renderer(tier, true))}</pre>
            </details>
        </div>
    `;
}

function getCollection(type) {
    if (type === "base") return bases;
    if (type === "frame") return frames;
    if (type === "icon") return icons;
    return decorations;
}

function buildOptions(containerId, data, type) {
    const container = document.getElementById(containerId);

    container.innerHTML = Object.entries(data).map(([key, item]) => `
        <button class="option ${state[type] === key ? "active" : ""}"
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
            <button class="tier-option ${state.tier === key ? "active" : ""}"
                data-type="tier"
                data-key="${key}">
                ${tier.name.toUpperCase()}
            </button>
        `).join("");
}

function buildGallery() {
    document.getElementById("baseGallery").innerHTML =
        Object.entries(bases).map(([key, item]) =>
            renderStandalone("base", key, item.render)
        ).join("");

    document.getElementById("frameGallery").innerHTML =
        Object.entries(frames).map(([key, item]) =>
            renderStandalone("frame", key, item.render)
        ).join("");

    document.getElementById("iconGallery").innerHTML =
        Object.entries(icons).map(([key, item]) =>
            renderStandalone("icon", key, item.render)
        ).join("");

    document.getElementById("decorationGallery").innerHTML =
        Object.entries(decorations).map(([key, item]) =>
            renderStandalone("decoration", key, item.render)
        ).join("");
}

function buildDesignReport() {
    const tier = tiers[state.tier];

    document.getElementById("designReport").innerHTML = `
        <div class="report-grid">
            <div>
                <span>BASE</span>
                <strong>${esc(bases[state.base].name)}</strong>
                <p>${esc(bases[state.base].visual)}</p>
            </div>
            <div>
                <span>FRAME</span>
                <strong>${esc(frames[state.frame].name)}</strong>
                <p>${esc(frames[state.frame].visual)}</p>
            </div>
            <div>
                <span>ICON</span>
                <strong>${esc(icons[state.icon].name)}</strong>
                <p>${esc(icons[state.icon].visual)}</p>
            </div>
            <div>
                <span>DECORATION</span>
                <strong>${esc(decorations[state.decoration].name)}</strong>
                <p>${esc(decorations[state.decoration].visual)}</p>
            </div>
            <div>
                <span>TIER</span>
                <strong>${esc(tier.name)}</strong>
                <p>Main ${tier.main}, bright ${tier.bright}, dark ${tier.dark}.</p>
            </div>
        </div>
    `;
}

function updateSummary() {
    document.getElementById("selectedBase").textContent = bases[state.base].name;
    document.getElementById("selectedFrame").textContent = frames[state.frame].name;
    document.getElementById("selectedIcon").textContent = icons[state.icon].name;
    document.getElementById("selectedDecoration").textContent = decorations[state.decoration].name;
    document.getElementById("selectedTier").textContent = tiers[state.tier].name;
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
    buildDesignReport();
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
        <path d="M90 45 L210 45 L210 165 Q210 230 150 260 Q90 230 90 165 Z"
            fill="url(#bg)" stroke="${tier.main}" stroke-width="6"/>
        <path d="M105 60 L195 60 L195 160 Q195 210 150 235 Q105 210 105 160 Z"
            fill="none" stroke="${tier.bright}" stroke-width="2" opacity=".7"/>
    `;
}

function renderMedal(tier) {
    return `
        <circle cx="150" cy="150" r="105"
            fill="url(#bg)" stroke="${tier.main}" stroke-width="8"/>
        <circle cx="150" cy="150" r="82"
            fill="none" stroke="${tier.bright}" stroke-width="2"/>
    `;
}

function renderCrest(tier) {
    return `
        <path d="M90 55 L210 55 L225 135 Q220 220 150 260 Q80 220 75 135 Z"
            fill="url(#bg)" stroke="${tier.main}" stroke-width="7"/>
        <path d="M105 70 L195 70 L207 135 Q200 200 150 230 Q100 200 93 135 Z"
            fill="none" stroke="${tier.bright}" stroke-width="2"/>
    `;
}

function renderHexagon(tier) {
    return `
        <polygon points="150,45 235,95 235,195 150,245 65,195 65,95"
            fill="url(#bg)" stroke="${tier.main}" stroke-width="7"/>
        <polygon points="150,62 216,101 216,189 150,228 84,189 84,101"
            fill="none" stroke="${tier.bright}" stroke-width="2"/>
    `;
}

function renderDiamond(tier) {
    return `
        <path d="M150 40 L245 150 L150 260 L55 150 Z"
            fill="url(#bg)" stroke="${tier.main}" stroke-width="7"/>
        <path d="M150 60 L225 150 L150 240 L75 150 Z"
            fill="none" stroke="${tier.bright}" stroke-width="2"/>
    `;
}

function renderRibbon(tier) {
    return `
        <path d="M75 75 L225 75 L210 220 L150 260 L90 220 Z"
            fill="url(#bg)" stroke="${tier.main}" stroke-width="7"/>
        <path d="M90 95 L210 95 L198 205 L150 235 L102 205 Z"
            fill="none" stroke="${tier.bright}" stroke-width="2"/>
    `;
}

// ========================================
// FRAMES
// ========================================

function renderClassicFrame(tier) {
    return `
        <rect x="65" y="40" width="470" height="620" rx="28"
            fill="none" stroke="${tier.main}" stroke-width="5"/>
        <rect x="78" y="53" width="444" height="594" rx="20"
            fill="none" stroke="${tier.bright}" stroke-width="2" opacity=".6"/>
    `;
}

function renderHeavyFrame(tier) {
    return `
        <rect x="55" y="30" width="490" height="640" rx="30"
            fill="none" stroke="${tier.dark}" stroke-width="18"/>
        <rect x="66" y="41" width="468" height="618" rx="23"
            fill="none" stroke="${tier.bright}" stroke-width="3"/>
    `;
}

function renderDoubleFrame(tier) {
    return `
        <rect x="48" y="28" width="504" height="644" rx="35"
            fill="none" stroke="${tier.main}" stroke-width="4"/>
        <rect x="67" y="47" width="466" height="606" rx="26"
            fill="none" stroke="${tier.bright}" stroke-width="4"/>
        <rect x="82" y="62" width="436" height="576" rx="20"
            fill="none" stroke="${tier.dark}" stroke-width="2"/>
    `;
}

function renderAngularFrame(tier) {
    return `
        <path d="M65 35 L535 35 L565 65 L565 635 L535 665 L65 665 L35 635 L35 65 Z"
            fill="none" stroke="${tier.main}" stroke-width="6"/>
        <path d="M80 52 L520 52 L548 80 L548 620 L520 648 L80 648 L52 620 L52 80 Z"
            fill="none" stroke="${tier.bright}" stroke-width="2"/>
    `;
}

function renderOrnateFrame(tier) {
    return `
        <rect x="50" y="30" width="500" height="640" rx="32"
            fill="none" stroke="${tier.dark}" stroke-width="14"/>
        <rect x="62" y="42" width="476" height="616" rx="25"
            fill="none" stroke="${tier.bright}" stroke-width="3"/>
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
        <g transform="translate(75 65)">
            <path d="M35 30 L125 30 L115 105 Q80 145 45 105 Z"
                fill="url(#metal)" stroke="${tier.bright}" stroke-width="3"/>
            <path d="M35 45 H8 Q8 105 48 105"
                fill="none" stroke="${tier.main}" stroke-width="12"/>
            <path d="M125 45 H152 Q152 105 112 105"
                fill="none" stroke="${tier.main}" stroke-width="12"/>
            <path d="M80 145 V175"
                stroke="${tier.main}" stroke-width="12"/>
            <path d="M48 182 H112"
                stroke="${tier.bright}" stroke-width="9"/>
        </g>
    `;
}

function renderCrown(tier) {
    return `
        <path d="M75 225 L90 125 L135 175 L170 105 L205 175 L250 125 L265 225 Z"
            fill="url(#metal)" stroke="${tier.bright}" stroke-width="4"/>
        <path d="M85 225 H255 L245 245 H95 Z"
            fill="${tier.dark}" stroke="${tier.main}" stroke-width="3"/>
    `;
}

function renderStar(tier) {
    return `
        <polygon points="150,60 170,115 230,118 183,153 198,210 150,178 102,210 117,153 70,118 130,115"
            fill="url(#metal)" stroke="${tier.bright}" stroke-width="4"/>
    `;
}

function renderBall(tier) {
    return `
        <circle cx="150" cy="150" r="78"
            fill="#101522" stroke="${tier.main}" stroke-width="8"/>
        <path d="M105 105 Q165 125 200 185"
            fill="none" stroke="${tier.bright}" stroke-width="5"/>
        <path d="M95 180 Q150 135 205 120"
            fill="none" stroke="${tier.dark}" stroke-width="5"/>
    `;
}

function renderTarget(tier) {
    return `
        <circle cx="150" cy="150" r="90"
            fill="none" stroke="${tier.dark}" stroke-width="18"/>
        <circle cx="150" cy="150" r="62"
            fill="none" stroke="${tier.main}" stroke-width="15"/>
        <circle cx="150" cy="150" r="30"
            fill="${tier.bright}"/>
    `;
}

function renderLightning(tier) {
    return `
        <path d="M175 50 L80 165 H140 L115 245 L220 115 H160 Z"
            fill="url(#metal)" stroke="${tier.bright}" stroke-width="4"/>
    `;
}

function renderNumber(tier) {
    return `
        <text x="150" y="205"
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
        <path d="M100 240 L110 205 L130 225 L150 190 L170 225 L190 205 L200 240 Z"
            fill="${tier.main}" stroke="${tier.bright}" stroke-width="2"/>
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
            <circle cx="200" cy="115" r="5"/>
            <circle cx="175" cy="95" r="3"/>
        </g>
    `;
}

function renderRays(tier) {
    return `
        <g stroke="${tier.main}" stroke-width="3" opacity=".7">
            <path d="M90 130 L55 105"/>
            <path d="M75 160 L35 150"/>
            <path d="M210 130 L245 105"/>
            <path d="M225 160 L265 150"/>
        </g>
    `;
}

function renderLaurels(tier) {
    return `
        <path d="M105 240 Q65 170 105 100"
            fill="none" stroke="${tier.main}" stroke-width="8"/>
        <path d="M195 240 Q235 170 195 100"
            fill="none" stroke="${tier.main}" stroke-width="8"/>
        <g fill="${tier.bright}">
            <ellipse cx="91" cy="210" rx="18" ry="7" transform="rotate(35 91 210)"/>
            <ellipse cx="80" cy="175" rx="18" ry="7" transform="rotate(20 80 175)"/>
            <ellipse cx="83" cy="135" rx="18" ry="7" transform="rotate(-10 83 135)"/>
            <ellipse cx="209" cy="210" rx="18" ry="7" transform="rotate(-35 209 210)"/>
            <ellipse cx="220" cy="175" rx="18" ry="7" transform="rotate(-20 220 175)"/>
            <ellipse cx="217" cy="135" rx="18" ry="7" transform="rotate(10 217 135)"/>
        </g>
    `;
}

function renderCorners(tier) {
    return `
        <g fill="${tier.main}">
            <path d="M50 50 H100 V58 H58 V100 H50 Z"/>
            <path d="M250 50 H200 V58 H242 V100 H250 Z"/>
            <path d="M50 250 H100 V242 H58 V200 H50 Z"/>
            <path d="M250 250 H200 V242 H242 V200 H250 Z"/>
        </g>
    `;
}

function renderDots(tier) {
    return `
        <g fill="${tier.main}">
            <circle cx="80" cy="80" r="5"/>
            <circle cx="105" cy="80" r="3"/>
            <circle cx="220" cy="80" r="5"/>
            <circle cx="195" cy="80" r="3"/>
            <circle cx="80" cy="220" r="5"/>
            <circle cx="105" cy="220" r="3"/>
            <circle cx="220" cy="220" r="5"/>
            <circle cx="195" cy="220" r="3"/>
        </g>
    `;
}

render();
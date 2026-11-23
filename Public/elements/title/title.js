const racketImageUrl = new URL(
  "../../assets/brand/karakal-tec-pro-elite.png",
  import.meta.url,
).href;

function renderRacketQ() {
  return `<span class="racket-q-slot"><img class="racket-q" src="${racketImageUrl}" alt="" /></span>`;
}

function renderBrandMark() {
  return `
    <span class="brand-mark" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
  `;
}

export function renderSquashWordmark() {
  return `S${renderRacketQ()}uash`;
}

export function renderTitle(homePath = "./") {
  return `
    <a class="brand-link" href="${homePath}" aria-label="The Squash Community home">
      ${renderBrandMark()}
      <span class="brand-copy">
        <span class="club-wordmark brand-wordmark">
          <span class="club-the">A PLACE FOR EVERY PLAYER</span>
          <strong><span class="club-title-the">The</span> ${renderSquashWordmark()}</strong>
          <span class="club-community">Community</span>
        </span>
      </span>
    </a>
  `;
}

export function renderTitleConcepts() {
  const concepts = [
    { number: "01", label: "Club — original palette", style: "club-original" },
    { number: "02", label: "Club — blue emphasis", style: "club-blue" },
    { number: "03", label: "Previous title — original design", style: "previous-live" },
    { number: "04", label: "Club — lime accent", style: "club-lime" },
    { number: "05", label: "Club — framed lockup", style: "club-framed" },
  ];

  return `
    <div class="title-concept-grid">
      ${concepts.map(({ number, label, style }) => `
        <article class="title-concept title-concept-club">
          <span class="title-concept-number">${number}</span>
          <span class="title-concept-label">${label}</span>
          ${
            style === "previous-live"
              ? `
                <div class="title-concept-preview title-club-variant title-previous-live">
                  ${renderBrandMark()}
                  <span class="previous-wordmark">
                    <span>A PLACE FOR EVERY PLAYER</span>
                    <strong>The Squash</strong>
                    <b>Community</b>
                  </span>
                </div>
              `
              : `
                <div class="title-concept-preview title-club-variant title-${style}">
                  ${renderBrandMark()}
                  <span class="club-wordmark">
                    <span class="club-the">${style === "club-lime" ? "A PLACE FOR EVERY PLAYER" : "The"}</span>
                    <strong>${style === "club-lime" ? `<span class="club-title-the">The</span> ${renderSquashWordmark()}` : renderSquashWordmark()}</strong>
                    <span class="club-community">Community</span>
                  </span>
                </div>
              `
          }
        </article>
      `).join("")}
    </div>
  `;
}

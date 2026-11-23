export function renderTitle(homePath = "./") {
  return `
    <a class="brand-link" href="${homePath}" aria-label="The Squash Community home">
      <span class="brand-mark" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span class="brand-copy">
        <span class="brand-kicker">A PLACE FOR EVERY PLAYER</span>
        <span class="brand-name">The Squash<br /><strong>Community</strong></span>
      </span>
    </a>
  `;
}

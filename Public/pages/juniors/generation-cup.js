export function renderGenerationCup() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">JUNIORS · FAMILY TEAM TOURNAMENT</p>
        <h1>Generation Cup</h1>
        <p class="public-lede">
          Team up across generations for a fun Sunday tournament where both
          players contribute to the result.
        </p>
      </header>

      <section class="training-session" aria-label="Generation Cup details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Bi-monthly Sundays</strong>
          <span class="training-time">12:00 <span aria-hidden="true">–</span> 14:00</span>
        </div>
        <div class="training-session-price">
          <span class="training-label">COST</span>
          <strong>£5</strong>
          <span class="training-price-note">per person</span>
        </div>
        <div class="training-session-coach">
          <span class="training-label">TEAM</span>
          <strong>One junior, one adult</strong>
          <span class="training-coach-note">Family members from different generations</span>
        </div>
      </section>

      <section class="training-approach" aria-labelledby="generation-cup-format">
        <div>
          <p class="public-eyebrow">TEAM FORMAT</p>
          <h2 id="generation-cup-format">Play as a family team</h2>
        </div>
        <p>
          Pair up with a family member from a different generation: one junior
          and one adult. It’s a fun tournament, and both players contribute to
          the team’s result.
        </p>
      </section>
    </article>
  `;
}

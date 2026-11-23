export function renderFridayClubnight() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">JUNIORS · WEEKLY HANDICAP</p>
        <h1>Friday Clubnight</h1>
        <p class="public-lede">
          A mix-ability club night where juniors play handicap matches, meet
          different opponents and compete across the season.
        </p>
      </header>

      <section class="training-session" aria-label="Friday Clubnight details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Friday</strong>
          <span class="training-time">18:20 <span aria-hidden="true">–</span> 19:20</span>
        </div>
        <div class="training-session-price">
          <span class="training-label">COST</span>
          <strong>£5 <span class="training-price-qualifier">for members</span></strong>
          <span class="training-price-note">£7 for non-members</span>
        </div>
        <div class="training-session-coach">
          <span class="training-label">COACH</span>
          <strong>Paul Holdway</strong>
          <span class="training-coach-note">Squash coach</span>
        </div>
      </section>

      <section class="training-approach" aria-labelledby="friday-clubnight-format">
        <div>
          <p class="public-eyebrow">HOW IT WORKS</p>
          <h2 id="friday-clubnight-format">A season-long challenge</h2>
        </div>
        <p>
          Play handicap matches against players of different standards. Your
          handicap moves up or down each week based on your performance, and
          the player who comes out on top at the end of the year keeps the
          trophy.
        </p>
      </section>
    </article>
  `;
}

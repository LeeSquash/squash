export function renderSupersquashSunday() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">JUNIORS · COACHING AND GAMES</p>
        <h1>SuperSquash Sunday</h1>
        <p class="public-lede">
          A varied Sunday session for all standards, with coaching and plenty
          of ways to enjoy being on court.
        </p>
      </header>

      <section class="training-session" aria-label="SuperSquash Sunday details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Sunday</strong>
          <span class="training-time">10:00 <span aria-hidden="true">–</span> 11:20</span>
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

      <section class="training-approach" aria-labelledby="supersquash-format">
        <div>
          <p class="public-eyebrow">ON COURT</p>
          <h2 id="supersquash-format">A bit of everything</h2>
        </div>
        <p>
          Sessions mix coaching and drills with matches, two-versus-one games
          and doubles. Players of all standards are welcome.
        </p>
      </section>
    </article>
  `;
}

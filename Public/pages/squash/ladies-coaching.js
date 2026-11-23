export function renderLadiesCoaching() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">SQUASH · LADIES SESSION</p>
        <h1>Ladies Coaching</h1>
        <p class="public-lede">
          A friendly ladies session with games and hitting work. All standards
          are welcome.
        </p>
      </header>

      <section class="training-session" aria-label="Ladies Coaching session details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Monday</strong>
          <span class="training-time">19:20 <span aria-hidden="true">–</span> 20:20</span>
        </div>
        <div class="training-session-price">
          <span class="training-label">COST</span>
          <strong>£5</strong>
          <span class="training-price-note">per session</span>
        </div>
        <div class="training-session-coach">
          <span class="training-label">COACH</span>
          <strong>Paul Holdway</strong>
          <span class="training-coach-note">Squash coach</span>
        </div>
      </section>

      <section class="training-approach" aria-labelledby="ladies-coaching-approach-title">
        <div>
          <p class="public-eyebrow">ON COURT</p>
          <h2 id="ladies-coaching-approach-title">Hitting, games and good company</h2>
        </div>
        <p>
          Enjoy a relaxed, welcoming session with hitting work and games on
          court. All standards are welcome.
        </p>
      </section>
    </article>
  `;
}

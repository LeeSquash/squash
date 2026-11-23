export function renderTeamTraining() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">SQUASH · COACHED SESSION</p>
        <h1>Team Training</h1>
        <p class="public-lede">
          A purposeful hour on court to sharpen your game, build better habits
          and put your practice into play.
        </p>
      </header>

      <section class="training-session" aria-label="Team Training session details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Tuesday</strong>
          <span class="training-time">18:00 <span aria-hidden="true">–</span> 19:00</span>
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

      <section class="training-approach" aria-labelledby="training-approach-title">
        <div>
          <p class="public-eyebrow">ON COURT</p>
          <h2 id="training-approach-title">Practice with purpose</h2>
        </div>
        <p>
          Sessions combine focused drills and routines with time to develop
          technique and movement around the court. Matchplay brings it together:
          a chance to test what you’ve worked on and make better decisions under
          pressure.
        </p>
      </section>
    </article>
  `;
}

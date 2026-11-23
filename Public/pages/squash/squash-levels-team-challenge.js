export function renderSquashLevelsTeamChallenge() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">SQUASH · TEAM COMPETITION</p>
        <h1>Squash Levels Team Challenge</h1>
        <p class="public-lede">
          Bring a team together and take on other teams in the Squash Levels
          Team Challenge.
        </p>
      </header>

      <section class="training-session" aria-label="Squash Levels Team Challenge details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Fridays</strong>
          <span class="training-time">18:20 <span aria-hidden="true">–</span> 21:00</span>
        </div>
        <div class="training-session-price">
          <span class="training-label">COST</span>
          <strong>£5 <span class="training-price-qualifier">for members</span></strong>
          <span class="training-price-note">£8.75 for non-members</span>
        </div>
        <div class="training-session-coach">
          <span class="training-label">HOW OFTEN</span>
          <strong>Every two months</strong>
          <span class="training-coach-note">Bi-monthly competition</span>
        </div>
      </section>

      <section class="training-approach" aria-labelledby="sltc-format-title">
        <div>
          <p class="public-eyebrow">TEAM FORMAT</p>
          <h2 id="sltc-format-title">Compete together</h2>
        </div>
        <p>
          Form a team of up to five players and compete together against other
          teams in the SLTC.
        </p>
      </section>
    </article>
  `;
}

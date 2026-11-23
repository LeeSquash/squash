export function renderIntroductionToSquash() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">SQUASH · BEGINNER-FRIENDLY SESSION</p>
        <h1>Introduction to Squash</h1>
        <p class="public-lede">
          New to squash? Build confidence, learn the basics and enjoy getting
          out on court in a welcoming session.
        </p>
      </header>

      <section class="training-session" aria-label="Introduction to Squash session details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Monday</strong>
          <span class="training-time">18:20 <span aria-hidden="true">–</span> 19:20</span>
        </div>
        <div class="training-session-price">
          <span class="training-label">COST</span>
          <strong>Free <span class="training-price-qualifier">for members</span></strong>
          <span class="training-price-note">£5 for non-members</span>
        </div>
        <div class="training-session-coach">
          <span class="training-label">COACH</span>
          <strong>Paul Holdway</strong>
          <span class="training-coach-note">Squash coach</span>
        </div>
      </section>

      <section class="training-approach" aria-labelledby="intro-squash-approach-title">
        <div>
          <p class="public-eyebrow">GET STARTED</p>
          <h2 id="intro-squash-approach-title">Learn by playing</h2>
        </div>
        <p>
          Learn the basics of squash, practise useful skills and have a go at
          matchplay. It’s a friendly introduction to the game and a great place
          to begin if you’re new to squash.
        </p>
      </section>
    </article>
  `;
}

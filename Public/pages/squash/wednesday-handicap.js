export function renderWednesdayHandicap() {
  return `
    <article class="public-page team-training-page">
      <header class="public-page-heading">
        <p class="public-eyebrow">SQUASH · WEEKLY TOURNAMENT</p>
        <h1>Wednesday Handicap</h1>
        <p class="public-lede">
          A fun weekly tournament, a good way back into squash and an easy way
          to meet new people to play.
        </p>
      </header>

      <section class="training-session" aria-label="Wednesday Handicap details">
        <div class="training-session-time">
          <span class="training-label">WHEN</span>
          <strong>Wednesday</strong>
          <span class="training-time">19:00 <span aria-hidden="true">–</span> 21:00</span>
        </div>
        <div class="training-session-price">
          <span class="training-label">COST</span>
          <strong>Free <span class="training-price-qualifier">for members</span></strong>
          <span class="training-price-note">£5 for non-members</span>
        </div>
        <div class="training-session-coach">
          <span class="training-label">ORGANISED BY</span>
          <strong>Paul Holdway</strong>
          <span class="training-coach-note">Session organiser</span>
        </div>
      </section>

      <section class="training-approach" aria-labelledby="wednesday-handicap-approach-title">
        <div>
          <p class="public-eyebrow">HOW IT WORKS</p>
          <h2 id="wednesday-handicap-approach-title">A different match-up each week</h2>
        </div>
        <p>
          Play handicapped matches against a variety of standards in a friendly
          weekly tournament. Whether you’re returning to squash or looking for
          new people to play, you’re welcome.
        </p>
      </section>
    </article>
  `;
}

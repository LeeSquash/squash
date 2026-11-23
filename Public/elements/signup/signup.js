export function renderSignup(memberAreaPath) {
  return `
    <section class="account-card signup-card" aria-labelledby="signup-heading">
      <span class="signup-icon" aria-hidden="true">+</span>
      <h2 id="signup-heading">Join the community</h2>
      <a class="button button-outline button-full" href="${memberAreaPath}?view=signup">Sign up <span aria-hidden="true">→</span></a>
    </section>
  `;
}

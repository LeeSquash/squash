export function renderLogin(memberAreaPath) {
  return `
    <section class="account-card login-card" aria-labelledby="login-heading">
      <h2 id="login-heading">Welcome back</h2>
      <a class="button button-dark button-full" href="${memberAreaPath}?view=login">Log in <span aria-hidden="true">→</span></a>
    </section>
  `;
}

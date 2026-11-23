export function renderMemberAccount(displayName) {
  const safeName = displayName.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

  return `
    <section class="account-card member-identity" aria-label="Signed-in account">
      <h2>Welcome, ${safeName}</h2>
      <button id="logout-button" class="button button-outline button-full" type="button">
        Log out <span aria-hidden="true">↗</span>
      </button>
    </section>
  `;
}

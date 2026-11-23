export function renderPageContent(section, page) {
  return `
    <section
      class="page-canvas"
      role="tabpanel"
      aria-labelledby="page-${page.id}"
      aria-label="${section.label} page area"
    ></section>
  `;
}

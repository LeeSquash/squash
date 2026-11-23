export function renderPageTabs(pages, activePageId) {
  return `
    <div class="page-tabs-inner" role="tablist" aria-label="Pages in this section">
      ${pages
        .map(
          (page) => `
            <button
              class="page-tab${page.id === activePageId ? " is-active" : ""}"
              type="button"
              role="tab"
              id="page-${page.id}"
              aria-selected="${page.id === activePageId}"
              aria-controls="page-content"
              data-page-id="${page.id}"
            >${page.label}</button>
          `,
        )
        .join("")}
    </div>
  `;
}

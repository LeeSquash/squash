export function renderSectionTabs(sections, activeSectionId) {
  return `
    <div class="section-tabs" role="tablist" aria-label="Sport sections">
      ${sections
        .map(
          (section) => `
            <button
              class="section-tab${section.id === activeSectionId ? " is-active" : ""}"
              type="button"
              role="tab"
              id="section-${section.id}"
              aria-selected="${section.id === activeSectionId}"
              aria-controls="page-content"
              data-section-id="${section.id}"
            >${section.label}</button>
          `,
        )
        .join("")}
    </div>
  `;
}

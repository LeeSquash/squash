import { enabledElements, memberAreaPath, sections } from "./config.js";
import { renderTitle } from "./elements/title/title.js";
import { renderLogin } from "./elements/login/login.js";
import { renderSignup } from "./elements/signup/signup.js";
import { renderSectionTabs } from "./elements/section/section.js";
import { renderPageTabs } from "./elements/tabs/tabs.js";
import { renderPageContent } from "./pages/page-content.js";

const elements = {
  title: document.querySelector("#site-title"),
  login: document.querySelector("#account-area"),
  sectionTabs: document.querySelector("#section-navigation"),
  pageTabs: document.querySelector("#page-navigation"),
  pageContent: document.querySelector("#page-content"),
};

let activeSectionId = "squash";
let activePageId = sections[0].pages[0].id;

function getActiveSection() {
  return sections.find((section) => section.id === activeSectionId);
}

function getActivePage() {
  const section = getActiveSection();
  return section.pages.find((page) => page.id === activePageId);
}

function render() {
  if (enabledElements.title) {
    elements.title.innerHTML = renderTitle();
  }

  if (enabledElements.login || enabledElements.signup) {
    const accountParts = [];
    if (enabledElements.login) accountParts.push(renderLogin(memberAreaPath));
    if (enabledElements.signup) accountParts.push(renderSignup(memberAreaPath));
    elements.login.innerHTML = accountParts.join("");
  } else {
    elements.login.innerHTML = "";
  }

  if (enabledElements.sectionTabs) {
    elements.sectionTabs.innerHTML = renderSectionTabs(sections, activeSectionId);
  } else {
    elements.sectionTabs.innerHTML = "";
  }

  if (enabledElements.pageTabs) {
    elements.pageTabs.innerHTML = renderPageTabs(
      getActiveSection().pages,
      activePageId,
    );
    elements.pageTabs.hidden = false;
  } else {
    elements.pageTabs.innerHTML = "";
    elements.pageTabs.hidden = true;
  }

  elements.pageContent.innerHTML = enabledElements.pageContent
    ? renderPageContent(getActiveSection(), getActivePage())
    : "";
}

document.addEventListener("click", (event) => {
  const sectionButton = event.target.closest("[data-section-id]");
  const pageButton = event.target.closest("[data-page-id]");

  if (sectionButton) {
    activeSectionId = sectionButton.dataset.sectionId;
    activePageId = getActiveSection().pages[0].id;
    render();
  } else if (pageButton) {
    activePageId = pageButton.dataset.pageId;
    render();
  }
});

render();

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { renderTitle } from "../Public/elements/title/title.js";
import { renderSectionTabs } from "../Public/elements/section/section.js";
import { renderPageTabs } from "../Public/elements/tabs/tabs.js";
import { supabaseConfig } from "../loginsystem/config.js";
import { renderMemberAccount } from "./elements/account/account.js";
import { sections } from "./config.js";
import { renderMemberPage } from "./pages/page-content.js";
import {
  connectAdminControls,
  connectMemberAccountControls,
} from "./pages/members/account.js";
import { connectStatsPageControls } from "./pages/stats/stats.js";

const elements = {
  title: document.querySelector("#site-title"),
  account: document.querySelector("#account-area"),
  sectionTabs: document.querySelector("#section-navigation"),
  pageTabs: document.querySelector("#page-navigation"),
  pageContent: document.querySelector("#page-content"),
};

const loginPath = "../loginsystem/index.html?view=login";
const publicPath = "../Public/index.html";
let supabase;
let currentUser;
let currentProfile;
let activeSectionId = "members";
let activePageId = "my-account";
let renderVersion = 0;

function getActiveSection() {
  return sections.find((section) => section.id === activeSectionId);
}

function getActivePage() {
  return getActiveSection().pages.find((page) => page.id === activePageId);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function renderHeader() {
  const visibleSections = sections
    .map((section) => ({
      ...section,
      pages: section.pages.filter(
        (page) => !page.adminOnly || currentProfile?.role === "admin",
      ),
    }))
    .filter((section) => section.pages.length);
  elements.title.innerHTML = renderTitle(publicPath);
  const displayName =
    currentProfile?.display_name || currentUser.email?.split("@")[0] || "Member";
  elements.account.innerHTML = renderMemberAccount(displayName);
  elements.sectionTabs.innerHTML = renderSectionTabs(
    visibleSections,
    activeSectionId,
  );
  elements.pageTabs.innerHTML = renderPageTabs(
    visibleSections.find((section) => section.id === activeSectionId).pages,
    activePageId,
  );
}

async function renderContent() {
  const version = ++renderVersion;
  const section = getActiveSection();
  const page = getActivePage();
  elements.pageTabs.innerHTML = renderPageTabs(section.pages, page.id);
  elements.pageContent.innerHTML =
    '<p class="member-loading" role="status">Loading this page…</p>';

  let content;
  try {
    content = currentProfile
      ? await renderMemberPage(section, page, supabase, currentUser, currentProfile)
      : `<section class="member-panel"><p class="member-error">Your member profile could not be loaded. Please try signing out and back in.</p></section>`;
  } catch (error) {
    console.error("Member page load failed:", error);
    content =
      '<section class="member-panel"><p class="member-error">This page could not be loaded. Please try again.</p></section>';
  }

  if (version !== renderVersion) return;
  elements.pageContent.innerHTML = content;
  if (section.id === "members" && page.id === "my-account" && currentProfile) {
    connectMemberAccountControls(supabase, currentUser);
  }
  if (section.id === "members" && page.id === "admin" && currentProfile?.role === "admin") {
    connectAdminControls(supabase);
    connectStatsPageControls(supabase, async () => {
      await renderContent();
    });
  }
  if (section.id === "stats" && page.id !== "stats-overview") {
    connectStatsFilters();
  }
}

function connectStatsFilters() {
  const seasonFilter = document.querySelector("#stats-season-filter");
  const playerFilter = document.querySelector("#stats-player-filter");
  if (!seasonFilter || !playerFilter) return;

  const table = document.querySelector("#competition-results-table");
  const sortButtons = [...document.querySelectorAll(".stats-sort-button")];
  const originalRows = table ? [...table.tBodies[0].rows] : [];
  let sortKey = table?.dataset.defaultSort || "";
  let sortDirection = table?.dataset.defaultDirection || "asc";

  const sortRows = () => {
    if (!table || !sortKey) return;
    const body = table.tBodies[0];
    const header = table.querySelector(`[data-sort-column="${sortKey}"]`);
    const sortType =
      sortButtons
        .find((button) => button.dataset.sortKey === sortKey)
        ?.dataset.sortType || header?.dataset.sortType;
    const rows = [...body.rows];
    rows.sort((left, right) => {
      const leftValue = left.dataset[sortKey] || "";
      const rightValue = right.dataset[sortKey] || "";
      let comparison;
      if (sortType === "number") {
        comparison = Number(leftValue) - Number(rightValue);
      } else {
        comparison = leftValue.localeCompare(rightValue, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }

      if (comparison !== 0) {
        return sortDirection === "desc" ? -comparison : comparison;
      }
      if (sortKey !== "season") {
        const seasonOrder = right.dataset.season.localeCompare(left.dataset.season);
        if (seasonOrder !== 0) return seasonOrder;
      }
      return left.dataset.player.localeCompare(right.dataset.player);
    });
    rows.forEach((row) => body.append(row));

    table.querySelectorAll("[data-sort-column]").forEach((column) => {
      const active = column.dataset.sortColumn === sortKey;
      column.setAttribute(
        "aria-sort",
        active
          ? sortDirection === "desc"
            ? "descending"
            : "ascending"
          : "none",
      );
      const indicator = column.querySelector(".stats-sort-button span");
      if (indicator) {
        indicator.textContent = active
          ? sortDirection === "desc"
            ? " ↓"
            : " ↑"
          : "";
      }
    });
  };

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.sortKey === sortKey) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortKey = button.dataset.sortKey;
        sortDirection = button.dataset.sortKey === "score" ? "desc" : "asc";
      }
      sortRows();
    });
  });

  if (sortButtons.length) sortRows();

  const applyFilters = () => {
    const season = seasonFilter.value;
    const player = playerFilter.value.trim().toLowerCase();
    if (table?.dataset.aggregateAllSeasons === "true") {
      const body = table.tBodies[0];
      let rowsToShow = originalRows.filter(
        (row) => !season || row.dataset.season === season,
      );

      if (!season) {
        const groupedRows = new Map();
        rowsToShow.forEach((row, index) => {
          const playerName = row.dataset.player;
          const groupKey =
            playerName === "anonymous player"
              ? `anonymous-${index}`
              : `player-${playerName}`;
          const grouped = groupedRows.get(groupKey);
          if (!grouped) {
            const aggregate = row.cloneNode(true);
            aggregate.dataset.season =
              playerName === "anonymous player" ? row.dataset.season : "All seasons";
            aggregate.cells[0].textContent = aggregate.dataset.season;
            groupedRows.set(groupKey, aggregate);
            return;
          }

          table.querySelectorAll("[data-sort-column]").forEach((column) => {
            const key = column.dataset.sortColumn;
            if (column.dataset.sortType !== "number" || key === "place") return;
            const total =
              Number(grouped.dataset[key] || 0) + Number(row.dataset[key] || 0);
            grouped.dataset[key] = String(total);
            const columnIndex = [...column.parentElement.children].indexOf(column);
            grouped.cells[columnIndex].textContent = String(total);
          });
        });

        rowsToShow = [...groupedRows.values()];
        const scoreColumn = table.querySelector('[data-sort-column="score"]');
        if (scoreColumn) {
          const scoreIndex = [...scoreColumn.parentElement.children].indexOf(scoreColumn);
          const rankedRows = rowsToShow.sort(
            (left, right) =>
              Number(right.dataset.score || 0) - Number(left.dataset.score || 0),
          );
          let previousScore = null;
          let rank = 0;
          rankedRows.forEach((row, index) => {
            const score = Number(row.dataset.score || 0);
            if (score !== previousScore) rank = index + 1;
            previousScore = score;
            row.dataset.place = String(rank);
            row.cells[1].textContent = String(rank);
            row.cells[scoreIndex].textContent = String(score);
          });
        }
      }

      body.replaceChildren(...rowsToShow);
    }

    const rows = [...document.querySelectorAll("#competition-results-table tbody tr")];
    let visibleRows = 0;
    rows.forEach((row) => {
      const visible = !player || row.dataset.player.includes(player);
      row.hidden = !visible;
      if (visible) visibleRows += 1;
    });
    const emptyMessage = document.querySelector("#stats-filter-empty");
    if (emptyMessage) emptyMessage.hidden = visibleRows !== 0;
    sortRows();
  };

  seasonFilter.addEventListener("change", applyFilters);
  playerFilter.addEventListener("input", applyFilters);
  applyFilters();
}

document.addEventListener("click", async (event) => {
  const sectionButton = event.target.closest("[data-section-id]");
  const pageButton = event.target.closest("[data-page-id]");
  const logoutButton = event.target.closest("#logout-button");

  if (logoutButton) {
    logoutButton.disabled = true;
    const { error } = await supabase.auth.signOut();
    if (error) {
      logoutButton.disabled = false;
      console.error("Sign out failed:", error.message);
      return;
    }
    window.location.replace(publicPath);
    return;
  }

  if (sectionButton) {
    const section = sections.find(
      (item) => item.id === sectionButton.dataset.sectionId,
    );
    if (!section) return;
    activeSectionId = section.id;
    activePageId = section.pages[0].id;
    renderHeader();
    await renderContent();
  } else if (pageButton) {
    const page = getActiveSection().pages.find(
      (item) => item.id === pageButton.dataset.pageId,
    );
    if (!page || (page.adminOnly && currentProfile?.role !== "admin")) return;
    activePageId = page.id;
    await renderContent();
  }
});

window.addEventListener("member-profile-updated", async () => {
  const { data, error } = await supabase
    .from("member_profiles")
    .select("display_name, share_competition_stats, player_key, role")
    .eq("user_id", currentUser.id)
    .single();
  if (error) {
    console.error("Updated member profile load failed:", error.message);
    return;
  }
  currentProfile = data;
  if (activePageId === "admin" && currentProfile.role !== "admin") {
    activePageId = "my-account";
  }
  renderHeader();
  await renderContent();
});

async function startMemberSite() {
  if (!supabaseConfig.publishableKey.trim()) {
    window.location.replace(loginPath);
    return;
  }

  supabase = createClient(supabaseConfig.url, supabaseConfig.publishableKey);
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Member session check failed:", error.message);
    window.location.replace(loginPath);
    return;
  }
  if (!data.session?.user) {
    window.location.replace(loginPath);
    return;
  }

  currentUser = data.session.user;
  const { data: profile, error: profileError } = await supabase
    .from("member_profiles")
    .select("display_name, share_competition_stats, player_key, role")
    .eq("user_id", currentUser.id)
    .single();

  if (profileError) {
    console.error("Member profile load failed:", profileError.message);
    currentProfile = null;
  } else {
    currentProfile = profile;
  }

  renderHeader();
  await renderContent();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || !session?.user) {
      window.location.replace(publicPath);
    }
  });
}

startMemberSite();

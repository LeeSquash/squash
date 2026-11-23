import { renderPageContent as renderPublicPageContent } from "../../Public/pages/page-content.js";
import { renderAdminPage, renderMemberAccount } from "./members/account.js";
import { renderStatsPage } from "./stats/stats.js";

export async function renderMemberPage(section, page, supabase, user, profile) {
  if (section.id === "members" && page.id === "my-account") {
    return renderMemberAccount(supabase, user, profile);
  }

  if (section.id === "members" && page.id === "admin") {
    return renderAdminPage(supabase, profile);
  }

  if (section.id === "stats") {
    return renderStatsPage(supabase, page);
  }

  return renderPublicPageContent(section, page);
}

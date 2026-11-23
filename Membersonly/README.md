# Members and stats site

This folder is the new members-only site. It uses the public site's existing title, section tabs, page tabs, and stylesheet so the header and visual design stay consistent. The original `squash` folder is a read-only reference and is not changed or loaded by this site.

## Folder guide

- `index.html` — shared-style page shell for the signed-in site.
- `app.js` — checks Supabase sign-in, controls section/page tabs, and handles sign-out.
- `config.js` — public sections plus the Members and Stats sections and their page tabs.
- `styles.css` — styles for member account and statistics content; the shared public stylesheet is loaded separately.
- `elements/account/` — signed-in account and log-out control in the top bar.
- `pages/members/` — the current member account page, which is the first Members tab.
- `pages/stats/` — member-facing statistics pages based on the competitions, leaderboard, and player profiles in the old site.

## Sections

The three public sections remain first. The signed-in site adds **Members** and **Stats**. The Members section has **My Account** and an **Admin** tab that is only rendered for administrator accounts. My Account shows member-facing information and privacy settings; the Admin tab contains member/player matching and spreadsheet import tools. The Stats section has an overview, leaderboard, competition tabs, and player profiles.

The member and stats sections are displayed only after Supabase confirms an active sign-in session. Session authentication is shared with `loginsystem` on the same website origin.

## Stats data

The competition pages read imported results from the protected `member_competition_stats` view, and the leaderboard and player directory use protected Supabase views. They do not load the old public JSON files or embed Google Sheets. Player names are shown unless a linked member explicitly checks “Hide my name”; that choice anonymises the results and removes the player from the named profile directory.

The Wednesday Handicap table uses its actual spreadsheet score and includes each season's placing, games played and won, first- and second-place finishes, and weeks played. The Junior Handicap table uses its actual spreadsheet score and includes weeks played. Both tables open on the newest season, can be filtered by season or player, and can be sorted by selecting a column heading. Choosing **All seasons** combines totals by player and recalculates place from the combined score. Members who hide their name still appear as “Anonymous player”; those entries remain separate in the combined view. The separate website points used for the overall member leaderboard are not shown in these competition tables.

An administrator can refresh the data from **Members → Admin → Update from spreadsheets**. The importer reads the spreadsheet IDs and season tabs from the existing `squash/scripts/configuration.js` as a read-only source, calculates points using the historic points rules, and replaces the Supabase competition data in one database transaction. It also builds the overall level and ranking summaries. The Admin tab and import action are only available for accounts with the Supabase `admin` role.

The importer preserves the historic Squash Levels Team Challenge points calculation. The old source configuration calls its score column `points`, while the old calculator reads `score`; changing that mismatch would change existing leaderboard totals, so it has not been silently altered here.

Before using the import button, run `loginsystem/supabase/migrations/002_member_stats_import.sql`, `003_allow_member_stats_refresh.sql`, and `004_show_names_unless_opted_out.sql` in the Supabase SQL Editor. The third migration updates the import function to meet Supabase's safe-update rule; the fourth applies the name-sharing default and corrected views. The first migration's administrator-promotion SQL must also have been applied for the importing account. The importer will not replace any existing records if fetching the source sheets fails.

The original Google sheets are currently published. Importing protects the copy served by this member site, but it does not revoke the old public spreadsheet URLs. To make the data genuinely members-only, change those source sheets' sharing/publishing settings after verifying imports and confirming nothing else relies on their public links.

For local testing with Live Server, open `membersonly/index.html` from the workspace root. If no member is signed in, the site sends them to the sign-in page.

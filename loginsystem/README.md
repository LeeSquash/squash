# Member sign-in system

This folder contains the sign-in and account-creation source. The public site's login and sign-up buttons open these forms. After successful sign-in, members are sent to the updated site in `../membersonly/`.

## What is included

- `index.html` — sign-in, sign-up and password reset forms.
- `app.js` — Supabase Auth; sends signed-in members to `../membersonly/`.
- `config.js` — this project's Supabase URL and public publishable-key setting.
- `styles.css` — the member-area visual style.
- `supabase/migrations/001_member_access.sql` — database tables, policies, anonymised stats view and admin-only account matching functions.

## Account and stats behaviour

- A new account signs up with an email and a password chosen by the member.
- Email verification is required when enabled in Supabase Auth settings. Passwords are never emailed; resets use a one-time link.
- Any verified account can sign in to the member area whether or not an administrator has linked it to a competition player profile.
- Any verified member can read the shared competition stats view.
- The "Hide my name" checkbox starts unchecked. Names are shown unless a member explicitly checks it; their stats remain visible to members as `Anonymous player`.
- A member can change this choice later in account settings. The database stores whether a name may be shown, so existing account choices are preserved when the checkbox wording is reversed.
- Only an administrator can use the screen to link a member to a player key.
- The raw competition table has no browser-readable policy. The historic-stats import function only permits administrators to replace its data.
- The personal level, total points and rank come from a separate protected summary view for the signed-in member's manually linked player record.
- Member account details, settings, and stats pages now live in the `membersonly` folder.

## Supabase setup needed before testing sign-in

1. In Supabase, open **SQL Editor**, paste in `supabase/migrations/001_member_access.sql`, and run it. Afterward, run `supabase/migrations/002_member_stats_import.sql`, `supabase/migrations/003_allow_member_stats_refresh.sql`, and `supabase/migrations/004_show_names_unless_opted_out.sql` to enable the protected historic-stats import and views.
2. In **Project Settings → API**, copy the **publishable** key (or legacy `anon` key) into `publishableKey` in `config.js`. This key is designed for browser use with the database policies in place. Never use a secret or service-role key in this file.
3. In **Authentication → URL Configuration**, add the local test URL you use (for example `http://127.0.0.1:5500/loginsystem/`) to the allowed redirect URLs.
4. In **Authentication → Providers → Email**, leave email confirmation enabled for normal use.
5. Apply the commented administrator-promotion SQL at the bottom of the migration after creating and verifying your own first account.

Supabase's built-in email sender is only for testing and has restrictions. Before inviting real members, configure a transactional email provider in **Authentication → SMTP Settings**.

## Historic competition data

`competition_stats` starts empty. An administrator can import and refresh historic results from **Stats → Overview** in the new members site. Importing uses the public spreadsheet source tabs in the old squash configuration, but saves the imported copy in protected Supabase tables. Never put a service-role key in website code.

The source files can be tested locally first. Publishing and connecting these screens to the GitHub Pages repository are later steps.

The current links assume `Public`, `loginsystem`, and `membersonly` are sibling folders during local development. The original `squash` pages and data are retained separately as a reference and are not linked into the new site.

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

function renderStatsRows(stats) {
  return stats
    .map(
      (stat) => `
        <tr>
          <td>${escapeHtml(stat.player_name)}</td>
          <td>${escapeHtml(stat.competition)}</td>
          <td>${escapeHtml(stat.season)}</td>
          <td>${escapeHtml(stat.points)}</td>
        </tr>
      `,
    )
    .join("");
}

async function loadAdminControls(supabase) {
  const [membersResult, playersResult] = await Promise.all([
    supabase.rpc("admin_list_members"),
    supabase.rpc("admin_list_player_keys"),
  ]);

  if (membersResult.error || playersResult.error) {
    console.error(
      "Admin data load failed:",
      membersResult.error || playersResult.error,
    );
    return `
      <p class="member-error" role="status">
        Admin tools could not load. Check the database setup.
      </p>
    `;
  }

  const unmatchedMembers = membersResult.data.filter((member) => !member.player_key);
  const linkedPlayerKeys = new Set(
    membersResult.data
      .map((member) => member.player_key)
      .filter(Boolean),
  );
  const availablePlayers = playersResult.data.filter(
    (player) => !linkedPlayerKeys.has(player.player_key),
  );
  const playerOptions = availablePlayers
    .map(
      (player) => `
        <option value="${escapeHtml(player.player_key)}">
          ${escapeHtml(player.player_name)} (${escapeHtml(player.player_key)})
        </option>
      `,
    )
    .join("");

  const memberRows = unmatchedMembers
    .map((member) => {
      return `
        <tr>
          <td>${escapeHtml(member.email)}</td>
          <td>${member.share_competition_stats ? "Name shown" : "Anonymised"}</td>
          <td>Not linked</td>
          <td>
            <select
              class="member-player-select"
              data-user-id="${escapeHtml(member.user_id)}"
              aria-label="Choose player for ${escapeHtml(member.email)}"
            >
              <option value="">Choose a player</option>
              ${playerOptions}
            </select>
            <button
              class="button button-outline save-member-match"
              data-user-id="${escapeHtml(member.user_id)}"
              type="button"
            >Save match</button>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div class="table-wrap">
      <table class="member-table">
        <thead>
          <tr>
            <th scope="col">Member email</th>
            <th scope="col">Sharing choice</th>
            <th scope="col">Linked player</th>
            <th scope="col">Match player</th>
          </tr>
        </thead>
        <tbody>${memberRows || `<tr><td colspan="4">${membersResult.data.length ? "All member accounts are linked to player profiles." : "No member accounts are waiting to be linked."}</td></tr>`}</tbody>
      </table>
    </div>
    <p id="admin-message" class="member-note" role="status" aria-live="polite"></p>
  `;
}

export async function renderMemberAccount(supabase, user, profile) {
  const [summaryResult, statsResult] = await Promise.all([
    supabase
      .from("my_player_summary")
      .select("level, total_points, rank")
      .maybeSingle(),
    supabase
      .from("member_competition_stats")
      .select("player_name, competition, season, points")
      .order("season", { ascending: false }),
  ]);

  if (summaryResult.error) {
    console.error("Player summary load failed:", summaryResult.error.message);
  }
  if (statsResult.error) {
    console.error("Member stats load failed:", statsResult.error.message);
  }

  const summary = summaryResult.data;
  const stats = statsResult.data || [];
  let profileStatus = profile.player_key
    ? "Your account is linked to your competition player profile."
    : "Your account is ready. Your player profile can be linked by the administrator.";

  if (summaryResult.error) {
    profileStatus = "Your account is ready, but your player summary could not be loaded.";
  } else if (profile.player_key && !summary) {
    profileStatus =
      "Your player profile is linked. Competition points will appear here when the stats are connected.";
  }

  return `
    <section class="member-page" aria-labelledby="member-title">
      <header class="member-heading">
        <div>
          <p class="member-eyebrow">MEMBERS AREA</p>
          <h1 id="member-title">Your account</h1>
          <p class="member-copy">Your membership, player profile, and community results.</p>
        </div>
      </header>

      <div class="member-grid">
        <section class="member-panel" aria-labelledby="profile-title">
          <div class="member-kicker">YOUR ACCOUNT</div>
          <h2 id="profile-title">Your player profile</h2>
          <p class="member-copy">${escapeHtml(profileStatus)}</p>
          <div class="player-score" aria-label="Your points and level">
            <div><span>LEVEL</span><strong>${escapeHtml(summary?.level ?? "—")}</strong></div>
            <div><span>TOTAL POINTS</span><strong>${summary ? escapeHtml(Number(summary.total_points).toLocaleString()) : "—"}</strong></div>
            <div><span>RANK</span><strong>${summary?.rank === null || summary?.rank === undefined ? "—" : `#${escapeHtml(summary.rank)}`}</strong></div>
          </div>
          <label class="sharing-choice profile-sharing">
            <input id="hide-name-setting" type="checkbox" ${profile.share_competition_stats ? "" : "checked"} />
            <span>Hide my name in competition stats shown to other members</span>
          </label>
          <p class="member-note">When checked, your name is anonymised in member stats.</p>
          <p id="member-message" class="member-note" role="status" aria-live="polite"></p>
        </section>

        <section class="member-panel stats-panel" aria-labelledby="stats-title">
          <div class="member-kicker">COMMUNITY SCOREBOARD</div>
          <h2 id="stats-title">Competition results</h2>
          ${
            statsResult.error
              ? '<p class="member-error">We could not load competition results. Please try again later.</p>'
              : stats.length
                ? `<p class="member-copy">${stats.length} competition result${stats.length === 1 ? "" : "s"}</p>
                   <div class="table-wrap">
                     <table class="member-table">
                       <thead><tr><th scope="col">Player</th><th scope="col">Competition</th><th scope="col">Season</th><th scope="col">Points</th></tr></thead>
                       <tbody>${renderStatsRows(stats)}</tbody>
                     </table>
                   </div>`
                : '<p class="member-copy">Your member area is ready. Competition results will appear here when the stats are connected.</p>'
          }
        </section>
      </div>
    </section>
  `;
}

export async function renderAdminPage(supabase, profile) {
  if (profile.role !== "admin") {
    return `
      <section class="member-panel">
        <p class="member-error">You do not have permission to view this page.</p>
      </section>
    `;
  }

  return `
    <section class="member-page" aria-labelledby="admin-title">
      <header class="member-heading">
        <div>
          <p class="member-eyebrow">ACCOUNT ADMINISTRATION</p>
          <h1 id="admin-title">Admin</h1>
          <p class="member-copy">This tab is only shown to administrator accounts. Ordinary members can access the other tabs in Members and Stats.</p>
        </div>
      </header>

      <section class="member-panel admin-panel" aria-labelledby="member-link-title">
        <div class="member-kicker">MEMBER ACCOUNTS</div>
        <h2 id="member-link-title">Link accounts to player profiles</h2>
        <p class="member-copy">Connect a verified member account to their existing competition record.</p>
        ${await loadAdminControls(supabase)}
      </section>

      <section class="member-panel admin-panel" aria-labelledby="import-title">
        <div class="member-kicker">COMPETITION DATA</div>
        <h2 id="import-title">Update stats from spreadsheets</h2>
        <p class="member-copy">Read the latest results from the existing spreadsheets and refresh the member-site copy in Supabase.</p>
        <div>
          <button id="import-stats-button" class="button button-outline" type="button">
            Update from spreadsheets <span aria-hidden="true">↻</span>
          </button>
          <p id="import-stats-status" class="member-note" role="status" aria-live="polite"></p>
        </div>
      </section>
    </section>
  `;
}

export function connectMemberAccountControls(supabase, user) {
  const sharingSetting = document.querySelector("#hide-name-setting");
  sharingSetting?.addEventListener("change", async (event) => {
    const checkbox = event.currentTarget;
    const { error } = await supabase
      .from("member_profiles")
      .update({ share_competition_stats: !checkbox.checked })
      .eq("user_id", user.id);

    if (error) {
      checkbox.checked = !checkbox.checked;
      document.querySelector("#member-message").textContent =
        "We couldn’t save your sharing choice. Please try again.";
      console.error("Sharing preference update failed:", error.message);
    } else {
      document.querySelector("#member-message").textContent =
        "Your sharing choice has been saved.";
    }
  });
}

export function connectAdminControls(supabase) {
  document.querySelectorAll(".save-member-match").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetUserId = button.dataset.userId;
      const select = [...document.querySelectorAll(".member-player-select")].find(
        (item) => item.dataset.userId === targetUserId,
      );
      if (!select?.value) {
        document.querySelector("#admin-message").textContent =
          "Choose an available player before saving the match.";
        return;
      }
      const { error } = await supabase.rpc("admin_link_member", {
        target_user_id: targetUserId,
        target_player_key: select.value,
      });

      if (error) {
        document.querySelector("#admin-message").textContent =
          "Could not save that match. Please try again.";
        console.error("Member profile match failed:", error.message);
        return;
      }

      document.querySelector("#admin-message").textContent =
        "Player match saved.";
      window.dispatchEvent(new CustomEvent("member-profile-updated"));
    });
  });
}

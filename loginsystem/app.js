import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { supabaseConfig } from "./config.js";

const authScreen = document.querySelector("#auth-screen");
const authMessage = document.querySelector("#auth-message");
const authForms = [...document.querySelectorAll(".auth-form")];
const memberSitePath = "../Membersonly/index.html";
const recoveryHash = new URLSearchParams(window.location.hash.slice(1));
let recoveringPassword = recoveryHash.get("type") === "recovery";
let supabase;

function showMessage(message, kind = "info") {
  authMessage.textContent = message;
  authMessage.className = `notice notice-${kind}`;
  authMessage.hidden = false;
}

function clearMessage() {
  authMessage.textContent = "";
  authMessage.hidden = true;
}

function showForm(formId) {
  authForms.forEach((form) => {
    form.hidden = form.id !== formId;
  });
  clearMessage();
}

function requireSupabaseConfig() {
  if (supabaseConfig.publishableKey.trim()) return true;
  showMessage(
    "Supabase is not connected yet. Add the project's publishable key in config.js to test sign-in.",
    "warning",
  );
  return false;
}

document.addEventListener("click", (event) => {
  const formButton = event.target.closest("[data-show]");
  if (formButton) showForm(formButton.dataset.show);
});

document.querySelector("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireSupabaseConfig()) return;

  const form = event.currentTarget;
  const { error } = await supabase.auth.signInWithPassword({
    email: form.elements.email.value.trim(),
    password: form.elements.password.value,
  });

  if (error) showMessage(error.message, "error");
});

document.querySelector("#signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireSupabaseConfig()) return;

  const form = event.currentTarget;
  const { data, error } = await supabase.auth.signUp({
    email: form.elements.email.value.trim(),
    password: form.elements.password.value,
    options: {
      emailRedirectTo: window.location.href.split("#")[0],
      data: {
        display_name: form.elements.display_name.value.trim(),
        share_competition_stats: !form.elements.hide_competition_name.checked,
      },
    },
  });

  if (error) {
    showMessage(error.message, "error");
  } else if (data.session) {
    window.location.replace(memberSitePath);
  } else {
    showMessage(
      "Check your email for a verification link. You can sign in after verifying your address.",
      "success",
    );
    form.reset();
  }
});

document.querySelector("#reset-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireSupabaseConfig()) return;

  const email = event.currentTarget.elements.email.value.trim();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.href.split("#")[0],
  });

  if (error) {
    showMessage(error.message, "error");
  } else {
    showMessage(
      "If an account exists for that email, a password-reset link will be sent.",
      "success",
    );
  }
});

document
  .querySelector("#new-password-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!requireSupabaseConfig()) return;

    const password = event.currentTarget.elements.password.value;
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      showMessage(error.message, "error");
    } else {
      recoveringPassword = false;
      await supabase.auth.signOut();
      showForm("login-form");
      showMessage("Your password has been updated. You can now sign in.", "success");
    }
  });

const requestedView = new URLSearchParams(window.location.search).get("view");
showForm(requestedView === "signup" ? "signup-form" : "login-form");

if (supabaseConfig.publishableKey.trim()) {
  supabase = createClient(supabaseConfig.url, supabaseConfig.publishableKey);
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      recoveringPassword = true;
      authScreen.hidden = false;
      showForm("new-password-form");
      return;
    }

    if (session?.user && !recoveringPassword) {
      window.location.replace(memberSitePath);
    }
  });
} else {
  showMessage(
    "This sign-in screen is ready. Add the Supabase publishable key in config.js to connect the account service.",
    "warning",
  );
}

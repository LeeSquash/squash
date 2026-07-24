// ========================================
// PLAYER PROFILE RENDERER
// Loads player data and assembles profile components
// ========================================

import { renderProfileHeader } from "./components/profileheader.js";
import { renderTrophyCabinet } from "./components/trophycabinet.js";
import { renderAchievementCard } from "./components/achievementcard.js";
import { renderCompetitionCard } from "./components/competitioncard.js";

console.log("NEW PROFILE SYSTEM LOADED");

const output = document.getElementById("profile-output");

const COMPETITION_ORDER = [
    "peteroberts",
    "sltc",
    "generationcup",
    "juniorclubnight",
    "racketballclubnight"
];

const params = new URLSearchParams(window.location.search);
const playerKey = params.get("player");


async function loadProfile() {

    const response = await fetch("../data/profiles.json");

    const profiles = await response.json();


    if (!playerKey || !profiles[playerKey]) {

        output.innerHTML = `
        <div class="profile-error">

            <h2>Player Not Found</h2>

            <p>Please select a valid player profile.</p>

        </div>
        `;

        return;

    }


    const player = profiles[playerKey];


    let html = "";


    html += renderProfileHeader(player);

    html += renderTrophyCabinet(player);

    html += renderAchievementCard(player);


    COMPETITION_ORDER.forEach(competitionKey => {

        const competition = player.competitions[competitionKey];

        if (!competition) return;

        html += renderCompetitionCard(competition);

    });


    output.innerHTML = html;

}


loadProfile();
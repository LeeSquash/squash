import { renderTeamTraining } from "./squash/team-training.js";
import { renderIntroductionToSquash } from "./squash/introduction-to-squash.js";
import { renderLadiesCoaching } from "./squash/ladies-coaching.js";
import { renderWednesdayHandicap } from "./squash/wednesday-handicap.js";
import { renderSquashLevelsTeamChallenge } from "./squash/squash-levels-team-challenge.js";
import { renderFridayClubnight } from "./juniors/friday-clubnight.js";
import { renderSupersquashSunday } from "./juniors/supersquash-sunday.js";
import { renderGenerationCup } from "./juniors/generation-cup.js";

const squashPageRenderers = {
  "team-training": renderTeamTraining,
  "introduction-to-squash": renderIntroductionToSquash,
  "ladies-coaching": renderLadiesCoaching,
  "wednesday-handicap": renderWednesdayHandicap,
  "squash-levels-team-challenge": renderSquashLevelsTeamChallenge,
};

const juniorPageRenderers = {
  "friday-clubnight": renderFridayClubnight,
  "supersquash-sunday": renderSupersquashSunday,
  "generation-cup": renderGenerationCup,
};

export function renderPageContent(section, page) {
  const renderer =
    section.id === "squash"
      ? squashPageRenderers[page.id]
      : section.id === "juniors"
        ? juniorPageRenderers[page.id]
        : undefined;
  const content = renderer?.() || "";

  return `
    <section
      class="page-canvas${content ? " page-canvas-content" : ""}"
      role="tabpanel"
      aria-labelledby="page-${page.id}"
      aria-label="${section.label} page area"
    >${content}</section>
  `;
}

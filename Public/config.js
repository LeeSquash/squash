// Switch a page element on or off here.
export const enabledElements = {
  title: true,
  login: true,
  signup: true,
  sectionTabs: true,
  pageTabs: true,
  pageContent: true,
};

export const memberAreaPath = "../loginsystem/index.html";

// Edit the section and page names here.
export const sections = [
  {
    id: "squash",
    label: "Squash",
    pages: [
      { id: "team-training", label: "Team Training" },
      { id: "introduction-to-squash", label: "Introduction to Squash" },
      { id: "ladies-coaching", label: "Ladies Coaching" },
      { id: "wednesday-handicap", label: "Wednesday Handicap" },
      {
        id: "squash-levels-team-challenge",
        label: "Squash Levels Team Challenge",
      },
    ],
  },
  {
    id: "racketball",
    label: "Racketball",
    pages: [{ id: "racketball-clubnight", label: "Racketball Clubnight" }],
  },
  {
    id: "juniors",
    label: "Juniors",
    pages: [
      { id: "friday-clubnight", label: "Friday Clubnight" },
      { id: "supersquash-sunday", label: "Supersquash Sunday" },
      { id: "generation-cup", label: "Generation Cup" },
    ],
  },
];

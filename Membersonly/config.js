import { sections as publicSections } from "../Public/config.js";

export const sections = [
  ...publicSections,
  {
    id: "members",
    label: "Members",
    pages: [
      { id: "my-account", label: "My Account" },
      { id: "admin", label: "Admin", adminOnly: true },
    ],
  },
  {
    id: "stats",
    label: "Stats",
    pages: [
      { id: "stats-overview", label: "Overview" },
      { id: "leaderboard", label: "Leaderboard" },
      { id: "box-leagues", label: "Box Leagues" },
      { id: "generation-cup", label: "Generation Cup" },
      { id: "junior-handicap", label: "Junior Handicap" },
      { id: "junior-squash-camps", label: "Junior Squash Camps" },
      { id: "racketball-handicap", label: "Racketball Handicap" },
      {
        id: "squash-levels-team-challenge",
        label: "Squash Levels Team Challenge",
      },
      { id: "wednesday-handicap", label: "Wednesday Handicap" },
      { id: "player-profiles", label: "Player Profiles" },
    ],
  },
];

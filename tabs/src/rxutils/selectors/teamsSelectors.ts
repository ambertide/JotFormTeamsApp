import { teamsDarkTheme, teamsHighContrastTheme, teamsTheme } from "@fluentui/react-northstar";
import reduxState from "interfaces/reduxState";
import { createSelector } from "reselect";

export const selectThemeName = (state: reduxState) => state.themeName;

/**
 * Return the current theme for Teams.
 */
export const selectTeamsTheme = createSelector([selectThemeName], (themeName: string) => {
  switch (themeName) {
    case "default":
      return teamsTheme;
    case "dark":
      return teamsDarkTheme;
    case "contrast":
      return teamsHighContrastTheme;
    default:
      return teamsTheme;
  }
});

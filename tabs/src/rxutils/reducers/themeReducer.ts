import { ThemeChangeAction } from "../../interfaces/reduxActions";
/**
 * Reduces the current theme in Microsoft Teams
 */
export default function themeReducer(state = "teams", action: ThemeChangeAction): string {
  switch (action.type) {
    case "THEME_CHANGE":
      return action.newTheme;
    default:
      return state;
  }
}

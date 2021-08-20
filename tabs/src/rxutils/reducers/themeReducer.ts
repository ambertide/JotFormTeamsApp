import { ThemeChangeAction } from "../../interfaces/reduxActions";
export default function themeReducer(state = "teams", action: ThemeChangeAction): string {
  switch (action.type) {
    case "THEME_CHANGE":
      return action.newTheme;
    default:
      return state;
  }
}

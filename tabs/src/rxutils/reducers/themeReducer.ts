import { ThemeChangeAction } from "../../interfaces/reduxActions";
export default function themeReducer(state = "teams", action: ThemeChangeAction) {
  switch (action.type) {
    case "THEME_CHANGE":
      return action.newTheme;
    default:
      return state;
  }
}

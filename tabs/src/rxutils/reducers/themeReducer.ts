import { formsAction, ThemeChangeAction } from "../../interfaces/reduxActions";
import { List } from "immutable";

export default function themeReducer(state = "teams", action: ThemeChangeAction) {
  switch (action.type) {
    case "THEME_CHANGE":
      return action.newTheme;
    default:
      return state;
  }
}

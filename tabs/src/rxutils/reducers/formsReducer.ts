import { formsAction } from "../../interfaces/reduxActions";
import { List } from "immutable";

export default function formsReducer(state = List(), action: formsAction) {
  switch (action.type) {
    case "FORMS_FETCHED":
      return action.newForms;
    default:
      return state;
  }
}

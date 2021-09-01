import { formsAction, FormsResetAction } from "../../interfaces/reduxActions";
import { List } from "immutable";
import updateCollection from "utils/updateCollection";
import { JotFormMetadata } from "interfaces/JotFormTypes";

/**
 * Reduces the list of user forms
 */
export default function formsReducer(
  state = List<JotFormMetadata>(),
  action: formsAction | FormsResetAction
) {
  switch (action.type) {
    case "FORMS_FETCHED":
      return updateCollection(state, action.newForms, (form) => form.id);
    case "FORMS_RESET": // Return the forms to the empty state.
      return List();
    default:
      return state;
  }
}

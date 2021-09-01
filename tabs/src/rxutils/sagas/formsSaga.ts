import { call, put, takeEvery } from "redux-saga/effects";
import { showError } from "utils/messaging";
import { getTables } from "../../api/JFApi";
import { formsRequestAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* getUserForms(action: formsRequestAction): any {
  try {
    const forms = yield call(getTables, action.apiKey, action.offset, action.limit);
    yield put({ type: "FORMS_FETCHED", newForms: forms });
  } catch (e) {
    showError(e.message);
  }
}

// Intercepts fetch request for User's JotForm forms.
export function* formsSaga() {
  yield takeEvery("FORMS_REQUEST", getUserForms);
}

import { call, put, takeEvery } from "redux-saga/effects";
import { getTables } from "../../api/JFApi";
import { formsRequestAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* getUserForms(action: formsRequestAction): any {
  try {
    const forms = yield call(getTables, action.apiKey);
    yield put({ type: "FORMS_FETCHED", newForms: forms });
  } catch (e) {
    console.log(e);
    yield put({ type: "CONN_ERR", message: e.message });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* formsSaga() {
  yield takeEvery("FORMS_REQUEST", getUserForms);
}
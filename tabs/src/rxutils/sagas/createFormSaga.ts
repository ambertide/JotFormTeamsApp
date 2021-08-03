import { call, put, takeEvery } from "redux-saga/effects";
import { postForm } from "api/JFApi";
import {
  createFormRequestAction,
  errorAction,
  formsRequestAction,
} from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* createNewForm(action: createFormRequestAction): any {
  try {
    const response = yield call(postForm, action.apiKey, action.formData);
    yield put<formsRequestAction>({ type: "FORMS_REQUEST", apiKey: action.apiKey });
  } catch (e) {
    yield put<errorAction>({ type: "CONN_ERR", errorMessage: e.message });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* createFormSaga() {
  yield takeEvery("FORM_CREATE_REQUEST", createNewForm);
}

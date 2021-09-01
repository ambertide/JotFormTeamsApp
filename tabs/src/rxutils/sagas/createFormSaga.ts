import { call, put, takeEvery } from "redux-saga/effects";
import { postForm } from "api/JFApi";
import { createFormRequestAction, formsRequestAction } from "../../interfaces/reduxActions";
import { showError } from "utils/messaging";

// Intercepts the login user requests to send API request.
function* createNewForm(action: createFormRequestAction): any {
  try {
    yield call(postForm, action.apiKey, action.formData);
    yield put<formsRequestAction>({ type: "FORMS_REQUEST", apiKey: action.apiKey });
  } catch (e) {
    showError(e.message);
  }
}

// Intercepts form creation requests.
export function* createFormSaga() {
  yield takeEvery("FORM_CREATE_REQUEST", createNewForm);
}

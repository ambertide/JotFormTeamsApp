import { getUserToken } from "api/AzureADApi";
import { call, put, takeEvery } from "redux-saga/effects";
import { AzureAction, AzureRequestKeyAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* getAzureKey(action: AzureRequestKeyAction): any {
  try {
    const token = yield call(getUserToken);
    yield put<AzureAction>({ type: "AZURE_LOGIN_SUCCESS", apiKey: token });
  } catch (e) {
    yield put<AzureAction>({ type: "AZURE_LOGIN_FAIL", apiKey: "" });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* azureADSaga() {
  yield takeEvery("AZURE_KEY_REQUEST", getAzureKey);
}

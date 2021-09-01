import { getUserToken } from "api/AzureADApi";
import { call, put, takeEvery } from "redux-saga/effects";
import { showError, showSuccess } from "utils/messaging";
import { AzureAction, AzureRequestKeyAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
// eslint-disable-next-line
function* getAzureKey(action: AzureRequestKeyAction): any {
  try {
    const token = yield call(getUserToken);
    showSuccess("Logged in to your Azure AD."); // TODO: Convert to show once.
    yield put<AzureAction>({ type: "AZURE_LOGIN_SUCCESS", apiKey: token });
  } catch (e) {
    showError("Unable to login to Azure AD.");
    yield put<AzureAction>({ type: "AZURE_LOGIN_FAIL", apiKey: "" });
  }
}

// Intercepts Azure Key requests
export function* azureADSaga() {
  yield takeEvery("AZURE_KEY_REQUEST", getAzureKey);
}

import { call, put, takeEvery } from "redux-saga/effects";
import { showError } from "utils/messaging";
import { login } from "../../api/JFApi";
import { AuthAction, authRequestAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* loginUser(action: authRequestAction): any {
  try {
    const userAppKey = yield call(login, action.username, action.password);
    yield put<AuthAction>({ type: "AUTH_SUCCESS", JFAppKey: userAppKey });
  } catch (e) {
    if (e.name === "LoginException") {
      showError("Wrong email or password.");
      yield put({ type: "AUTH_FAIL", JFAppKey: "" });
    } else {
      showError(e.message);
    }
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* authSaga() {
  yield takeEvery("AUTH_REQUEST", loginUser);
}

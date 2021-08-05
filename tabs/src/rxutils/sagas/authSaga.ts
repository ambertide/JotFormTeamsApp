import { call, put, takeEvery } from "redux-saga/effects";
import { login } from "../../api/JFApi";
import { authRequestAction, errorAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* loginUser(action: authRequestAction): any {
  try {
    const user = yield call(login, action.username, action.password);
    yield put({ type: "AUTH_SUCCESS", newUser: user });
  } catch (e) {
    if (e.name === "LoginException") {
      yield put({ type: "AUTH_FAIL", message: e.message });
    } else {
      yield put<errorAction>({ type: "CONN_ERR", errorMessage: e.message });
    }
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* authSaga() {
  yield takeEvery("AUTH_REQUEST", loginUser);
}

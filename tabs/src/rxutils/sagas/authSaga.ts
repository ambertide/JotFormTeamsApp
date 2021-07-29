import { call, put, takeEvery } from "redux-saga/effects";
import { login } from "../../api/User";
import { authRequestAction } from "../../interfaces/reduxActions";

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action: authRequestAction): any {
  try {
    const user = yield call(login, action.username, action.password);
    yield put({ type: "AUTH_SUCCESS", user: user });
  } catch (e) {
    yield put({ type: "AUTH_FAIL", message: e.message });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* authSaga() {
  yield takeEvery("AUTH_REQUEST", loginUser);
}

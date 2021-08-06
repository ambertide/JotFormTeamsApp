import { sendPollToTeam } from "api/JFPollApi";
import { call, put, takeEvery } from "redux-saga/effects";
import { errorAction, RequestSendPollAction, SuccessAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* sendPoll(action: RequestSendPollAction): any {
  try {
    yield call(sendPollToTeam, action.teamID, action.channelID, action.formID, action.apiKey);
    yield put<SuccessAction>({ type: "SUCCESS", message: "Poll sent!" });
  } catch (e) {
    yield put<errorAction>({ type: "CONN_ERR", errorMessage: e });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* sendPollSaga() {
  yield takeEvery("SEND_POLL_REQUEST", sendPoll);
}

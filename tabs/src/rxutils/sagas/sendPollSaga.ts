import { sendPollToTeam } from "api/JFPollApi";
import { call, takeEvery } from "redux-saga/effects";
import { showError, showSuccess } from "utils/messaging";
import { RequestSendPollAction } from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* sendPoll(action: RequestSendPollAction): any {
  // TODO: Remove this alltogether?
  try {
    yield call(sendPollToTeam, action.teamID, action.channelID, action.formID, action.apiKey);
    showSuccess("Poll sent!");
  } catch (e) {
    showError(e.message);
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* sendPollSaga() {
  yield takeEvery("SEND_POLL_REQUEST", sendPoll);
}

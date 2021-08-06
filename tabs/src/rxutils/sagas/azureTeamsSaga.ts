import { getUserTeams } from "api/AzureADApi";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  AzureRequestTeamsListAction,
  AzureFetchedTeamsListAction,
  AzureErrorAction,
} from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
function* getAzureTeamsList(action: AzureRequestTeamsListAction): any {
  try {
    const teams = yield call(getUserTeams);
    yield put<AzureFetchedTeamsListAction>({ type: "AZURE_TEAMS_FETCHED", teams });
  } catch (e) {
    yield put<AzureErrorAction>({ type: "AZURE_ERROR", message: e });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* azureTeamsSaga() {
  yield takeEvery("AZURE_TEAMS_REQUEST", getAzureTeamsList);
}

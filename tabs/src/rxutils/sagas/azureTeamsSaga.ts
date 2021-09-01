import { getUserTeams } from "api/AzureADApi";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  AzureRequestTeamsListAction,
  AzureFetchedTeamsListAction,
  AzureErrorAction,
} from "../../interfaces/reduxActions";

// Intercepts the login user requests to send API request.
// eslint-disable-next-line
function* getAzureTeamsList(action: AzureRequestTeamsListAction): any {
  try {
    const teams = yield call(getUserTeams);
    yield put<AzureFetchedTeamsListAction>({ type: "AZURE_TEAMS_FETCHED", teams });
  } catch (e) {
    yield put<AzureErrorAction>({ type: "AZURE_ERROR", message: e });
  }
}

// Intercepts Azure Teams fetch requests.
export function* azureTeamsSaga() {
  yield takeEvery("AZURE_TEAMS_REQUEST", getAzureTeamsList);
}

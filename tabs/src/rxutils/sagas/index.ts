import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { azureADSaga } from "./azureADSaga";
import { createFormSaga } from "./createFormSaga";
import { formsSaga } from "./formsSaga";
import { azureTeamsSaga } from "./azureTeamsSaga";

export default function* rootSaga() {
  yield all([formsSaga(), authSaga(), createFormSaga(), azureADSaga(), azureTeamsSaga()]);
}

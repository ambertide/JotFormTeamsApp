import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { formsSaga } from "./formsSaga";

export default function* rootSaga() {
  yield all([formsSaga(), authSaga()]);
}

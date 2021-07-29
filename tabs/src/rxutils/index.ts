import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import { authSaga } from "./sagas/authSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSaga);

export { store };

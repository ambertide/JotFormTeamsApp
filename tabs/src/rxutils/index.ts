import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import { authSaga } from "./sagas/authSaga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(authSaga);

export { store };

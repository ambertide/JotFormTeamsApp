import { applyMiddleware, compose, createStore } from "redux";
import { persistedReducer } from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";
import persistStore from "redux-persist/es/persistStore";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };

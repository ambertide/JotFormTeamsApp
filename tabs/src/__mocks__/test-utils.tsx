import React, { FC, ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "rxutils/reducers";
import { Provider as NorthstarProivder, teamsTheme } from "@fluentui/react-northstar";
import { MemoryRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootSaga from "rxutils/sagas";

const sagaMiddleware = createSagaMiddleware();
const globalStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
export const sagas = sagaMiddleware.run(rootSaga);

function customRender(ui: ReactElement, { store = globalStore, ...renderOptions }: any = {}) {
  const Wrapper: FC = ({ children }) => {
    return (
      <Provider store={store}>
        <ToastContainer />
        <NorthstarProivder theme={teamsTheme}>
          <Router>{children}</Router>
        </NorthstarProivder>
      </Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { customRender as render };

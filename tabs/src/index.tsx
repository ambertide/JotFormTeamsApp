import ReactDOM from "react-dom";
import App from "./pages/App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./rxutils";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import TabConfig from "pages/TabConfig";
import FormsPage from "pages/FormsPage";
import { ToastContainer } from "react-toastify";
import { Provider as NorthstarProvider, teamsTheme, Loader, Box } from "@fluentui/react-northstar";
import ErrorBoundary from "utils/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import FormBuilderPage from "pages/FormBuilderPage";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <NorthstarProvider
      theme={teamsTheme}
      className="mainProvider"
      styles={{ justifyContent: "center" }}
    >
      <PersistGate persistor={persistor} loading={<Loader />}>
        <Box>
          <ToastContainer />
          <ErrorBoundary>
            <Router>
              <Switch>
                <Route exact path="/tab">
                  <App />
                </Route>
                <Route exact path="/forms">
                  <FormsPage />
                </Route>
                <Route exact path="/config">
                  <TabConfig />
                </Route>
                <Route exact path="/create">
                  <FormBuilderPage />
                </Route>
              </Switch>
            </Router>
          </ErrorBoundary>
        </Box>
      </PersistGate>
    </NorthstarProvider>
  </Provider>,
  document.getElementById("root")
);

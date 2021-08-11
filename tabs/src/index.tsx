import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./rxutils";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import { TabConfig } from "pages/teams";
import { Auth, FormsPage, FormBuilderPage, App } from "pages/tab";
import { ToastContainer } from "react-toastify";
import { Provider as NorthstarProvider, teamsTheme, Loader, Box } from "@fluentui/react-northstar";
import ErrorBoundary from "utils/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import * as teams from "@microsoft/teams-js";
import { Providers, TeamsProvider, ProviderState } from "@microsoft/mgt";
import { SubmittedPage, PollPage } from "pages/task_module";
import { showError } from "utils/messaging";

TeamsProvider.microsoftTeamsLib = teams;
const config = {
  clientId: "f33b568f-ba01-477c-a45a-bac73d5fffa4", //TODO: Possibly hide this.
  authPopupUrl: "index.html#/auth",
  scopes: [
    "Team.ReadBasic.All",
    "Channel.ReadBasic.All",
    "ChannelMessage.Send",
    "AccessReview.Read.All",
  ],
};
Providers.globalProvider = new TeamsProvider(config);
Providers.onProviderUpdated((event) => {
  if (
    Providers.globalProvider.state === ProviderState.SignedIn &&
    store.getState().auth.get("AzureADToken") === ""
  ) {
    // If we logged in but did not acquire the token, acquire the token.
    store.dispatch({ type: "AZURE_KEY_REQUEST" } as any);
  } else if (Providers.globalProvider.state === ProviderState.SignedOut) {
    showError("Unable to login to Azure AD.");
    store.dispatch({ type: "AZURE_LOGIN_FAIL", apiKey: "" });
  }
});

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
                <Route exact path="/auth">
                  <Auth />
                </Route>
                <Route path="/poll/:apiKey/:formID/:formName">
                  <PollPage />
                </Route>
                <Route path="/submitted/:status">
                  <SubmittedPage />
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

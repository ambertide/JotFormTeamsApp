import ReactDOM from "react-dom";
import "./index.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "./rxutils";
import { ToastContainer } from "react-toastify";
import { Provider as NorthstarProvider, Loader } from "@fluentui/react-northstar";
import ErrorBoundary from "utils/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import * as teams from "@microsoft/teams-js";
import { Providers, TeamsProvider, ProviderState } from "@microsoft/mgt";
import { showError } from "utils/messaging";
import App from "pages/App";
import { ThemeChangeAction } from "interfaces/reduxActions";
import { selectTeamsTheme } from "rxutils/selectors";

if (process.env.REACT_APP_MSW === "true") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require("./__mocks__/browser");
  worker.start();
}

TeamsProvider.microsoftTeamsLib = teams;
const config = {
  clientId: "CLIENT ID", //TODO: Replace with your client ID for Azure.
  authPopupUrl: "index.html#/auth",
  scopes: [
    "Team.ReadBasic.All",
    "Channel.ReadBasic.All",
    "ChannelMessage.Send",
    "AccessReview.Read.All",
  ],
};
Providers.globalProvider = new TeamsProvider(config);
Providers.onProviderUpdated(() => {
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

function TeamsApp() {
  teams.initialize();
  const dispatch = useDispatch();
  teams.registerOnThemeChangeHandler((theme) => {
    dispatch<ThemeChangeAction>({ type: "THEME_CHANGE", newTheme: theme });
  });
  const currentTheme = useSelector(selectTeamsTheme);
  return (
    <NorthstarProvider
      theme={currentTheme}
      className="mainProvider"
      styles={{ justifyContent: "center" }}
    >
      <PersistGate persistor={persistor} loading={<Loader />}>
        <ToastContainer />
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </PersistGate>
    </NorthstarProvider>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <TeamsApp />
  </Provider>,
  document.getElementById("root")
);

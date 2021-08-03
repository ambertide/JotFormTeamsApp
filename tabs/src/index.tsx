import ReactDOM from "react-dom";
import App from "./pages/App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./rxutils";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import TabConfig from "pages/TabConfig";
import FormsPage from "pages/FormsPage";
import { ToastContainer, toast } from "react-toastify";
import { Provider as NorthstarProvider, teamsTheme, Flex, Box } from "@fluentui/react-northstar";
import FormBuilderPage from "pages/FormBuilderPage";

ReactDOM.render(
  <Provider store={store}>
    <NorthstarProvider
      theme={teamsTheme}
      className="mainProvider"
      styles={{ justifyContent: "center" }}
    >
      <Box>
        <ToastContainer />
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
      </Box>
    </NorthstarProvider>
  </Provider>,
  document.getElementById("root")
);

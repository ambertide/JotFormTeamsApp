import { pingProxy } from "api/JFPollApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HashRouter as Router, Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { selectIsJFAuth } from "rxutils/selectors";
import { SubmissionsRouter } from "./submissions";
import { Auth, LoginPage, TabRouter } from "./tab";
import { PollRouter } from "./task_module";
import { TabConfig } from "./teams";

// Almost verbatim form reactrouter auth workflow example.
function PrivateRoute({ children, ...rest }: RouteProps) {
  const isAuth = useSelector(selectIsJFAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  useEffect(() => {
    pingProxy(); // This wakes up the server, because free heroku servers sleep.
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/tab">
          <TabRouter />
        </PrivateRoute>
        <Route path="/poll">
          <PollRouter />
        </Route>
        <PrivateRoute path="/results">
          <SubmissionsRouter />
        </PrivateRoute>
        <Route exact path="/config">
          <TabConfig />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}

import { useSelector } from "react-redux";
import { HashRouter as Router, Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { selectIsJFAuth } from "rxutils/selectors";
import SubmissionsRouter from "./submissions/SubmissionsRouter";
import { Auth, LoginPage } from "./tab";
import TabRouter from "./tab/TabRouter";
import PollRouter from "./task_module/PollRouter";
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
  return (<Router>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <PrivateRoute path="/tab">
        <TabRouter />
      </PrivateRoute>
      <PrivateRoute path="/poll">
        <PollRouter />
      </PrivateRoute>
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
  </Router>);
}

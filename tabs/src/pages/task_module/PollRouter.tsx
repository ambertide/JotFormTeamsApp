import { Route, Switch } from "react-router-dom";
import PollPage from "./PollPage";
import SubmittedPage from "./SubmittedPage";

/**
 * Routes to /poll routes.
 */
export default function PollRouter() {
  return (
    <Switch>
      <Route path="/poll/:uuid/:formName/submitted/:status/">
        <SubmittedPage />
      </Route>
      <Route path="/poll/:uuid/:formName">
        <PollPage />
      </Route>
    </Switch>
  );
}

import { Route, Switch } from "react-router-dom";
import PollPage from "./PollPage";
import SubmittedPage from "./SubmittedPage";

export default function PollRouter() {
  return (
    <Switch>
      <Route path="/poll/:uuid/:formName">
        <PollPage />
      </Route>
      <Route path="/poll/submitted/:status">
        <SubmittedPage />
      </Route>
    </Switch>
  );
}

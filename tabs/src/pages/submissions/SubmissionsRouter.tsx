import { Route, Switch } from "react-router-dom";
import SubmissionSelector from "./SubmissionSelector";
import SubmissionsViewerPage from "./SubmissionsViewerPage";

export default function SubmissionsRouter() {
  return (
    <Switch>
      <Route path="/results" exact>
        <SubmissionSelector />
      </Route>
      <Route path="/results/:formID/:formName">
        <SubmissionsViewerPage />
      </Route>
    </Switch>
  );
}

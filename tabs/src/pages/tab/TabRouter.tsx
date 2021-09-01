import { Route, Switch } from "react-router-dom";
import FormBuilderPage from "./FormBuilderPage";
import FormsPage from "./FormsPage";
import SelectorPage from "./SelectorPage";

/**
 * Routes to /tab routes.
 */
export default function TabRouter() {
  return (
    <Switch>
      <Route exact path="/tab">
        <SelectorPage />
      </Route>
      <Route exact path="/tab/forms">
        <FormsPage />
      </Route>
      <Route exact path="/tab/create">
        <FormBuilderPage />
      </Route>
    </Switch>
  );
}

// https://fluentsite.z22.web.core.windows.net/quick-start
import "./App.css";
import { useSelector } from "react-redux";
import reduxState from "../interfaces/reduxState";
import LoginPage from "./LoginPage";
import * as teams from "@microsoft/teams-js";
import SelectorPage from "./SelectorPage";
/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const user = useSelector((state: reduxState) => state.auth);
  teams.initialize(() => {
    teams.getContext((context) => console.log(context));
  });
  return user.isAuth ? <SelectorPage /> : <LoginPage />;
}

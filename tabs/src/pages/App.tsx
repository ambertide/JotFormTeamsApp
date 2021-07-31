// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Flex } from "@fluentui/react-northstar";
import "./App.css";
import { useSelector } from "react-redux";
import reduxState from "../interfaces/reduxState";
import FormsPage from "./FormsPage";
import LoginPage from "./LoginPage";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const user = useSelector((state: reduxState) => state.auth);
  return (
    <Provider theme={teamsTheme} styles={{ backgroundColor: "#eeeeee" }} className="mainProvider">
      <Flex>{user.isAuth ? <FormsPage /> : <LoginPage />}</Flex>
    </Provider>
  );
}

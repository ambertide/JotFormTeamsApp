import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader, Flex } from "@fluentui/react-northstar";
import Forms from "./Tab";
import "./App.css";
import { useSelector } from "react-redux";
import reduxState from "../interfaces/reduxState";
import Login from "./Login/Login";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const user = useSelector((state: reduxState) => state.auth);
  return (
    <Provider theme={teamsTheme} styles={{ backgroundColor: "#eeeeee" }} className="mainProvider">
      <Flex>{user.isAuth ? <Forms /> : <Login />}</Flex>
    </Provider>
  );
}

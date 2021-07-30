import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader, Flex } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import "./App.css";
import { useSelector } from "react-redux";
import TabConfig from "./TabConfig";
import reduxState from "../interfaces/reduxState";
import { useEffect } from "react";
import Login from "./Login/Login";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const user = useSelector((state: reduxState) => state.auth);
  return (
    <Provider theme={teamsTheme} styles={{ backgroundColor: "#eeeeee" }} className="mainProvider">
      <Flex>{user.isAuth ? <Tab /> : <Login />}</Flex>
    </Provider>
  );
}

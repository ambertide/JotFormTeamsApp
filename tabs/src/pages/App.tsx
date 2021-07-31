// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Flex } from "@fluentui/react-northstar";
import Forms from "components/Forms";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import reduxState from "../interfaces/reduxState";
import Login from "components/Login";
import { useCallback } from "react";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const user = useSelector((state: reduxState) => state.auth);
  const dispatch = useDispatch();
  const dispatchLoginCredentials = useCallback(
    (username: string, password: string) => {
      dispatch({ type: "AUTH_REQUEST", username: username, password: password });
    },
    [dispatch]
  );
  return (
    <Provider theme={teamsTheme} styles={{ backgroundColor: "#eeeeee" }} className="mainProvider">
      <Flex>{user.isAuth ? <Forms /> : <Login onSubmit={dispatchLoginCredentials} />}</Flex>
    </Provider>
  );
}

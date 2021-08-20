import { Flex } from "@fluentui/react-northstar";
import { Login } from "components/Tab";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

interface From {
  from: string;
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation<From>();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: "/" } }; // Almost verbatim form reactrouter auth workflow example.
  const userLogin = useCallback(
    (username: string, password: string) => {
      dispatch({ type: "AUTH_REQUEST", username: username, password: password });
      history.replace(from); // Almost verbatim form reactrouter auth workflow example.
    },
    [dispatch, history, from]
  );
  return (
    <Flex styles={{ backgroundColor: "#eeeeee" }} hAlign="center">
      <Login onSubmit={userLogin} />
    </Flex>
  );
}

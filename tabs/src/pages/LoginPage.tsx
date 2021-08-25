import { Flex } from "@fluentui/react-northstar";
import { Login } from "components/Tab";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { selectIsJFAuth } from "rxutils/selectors";

interface From {
  from: string;
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation<From>();
  const isLoggedIn = useSelector(selectIsJFAuth);
  const history = useHistory();
  const { from } = location.state || { from: { pathname: "/" } }; // Almost verbatim form reactrouter auth workflow example.
  const userLogin = useCallback(
    (username: string, password: string) => {
      dispatch({ type: "AUTH_REQUEST", username: username, password: password });
    },
    [dispatch, history, from]
  );
  useEffect(() => {
    if (isLoggedIn) {
      history.replace(from);
    }
  }, [from, history, isLoggedIn]);
  return (
    <Flex styles={{ backgroundColor: "#eeeeee" }} hAlign="center">
      <Login onSubmit={userLogin} />
    </Flex>
  );
}

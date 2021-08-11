import { Flex } from "@fluentui/react-northstar";
import { Login } from "components/Tab";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const dispatchLoginCredentials = useCallback(
    (username: string, password: string) => {
      dispatch({ type: "AUTH_REQUEST", username: username, password: password });
    },
    [dispatch]
  );
  return (
    <Flex styles={{ backgroundColor: "#eeeeee" }} hAlign="center">
      <Login onSubmit={dispatchLoginCredentials} />
    </Flex>
  );
}

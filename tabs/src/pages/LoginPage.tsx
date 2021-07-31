import Login from "components/Login";
import reduxState from "interfaces/reduxState";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const dispatchLoginCredentials = useCallback(
    (username: string, password: string) => {
      dispatch({ type: "AUTH_REQUEST", username: username, password: password });
    },
    [dispatch]
  );
  return <Login onSubmit={dispatchLoginCredentials} />;
}

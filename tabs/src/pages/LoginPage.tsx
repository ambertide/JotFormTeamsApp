import { Flex } from "@fluentui/react-northstar";
import { Login } from "components/Tab";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { selectIsJFAuth } from "rxutils/selectors";

interface From {
  from: string;
}

export default function LoginPage() {
  const location = useLocation<From>();
  const isLoggedIn = useSelector(selectIsJFAuth);
  const history = useHistory();
  const { isLoading, requestLogin } = useAuth();
  const { from } = location.state || { from: { pathname: "/" } }; // Almost verbatim form reactrouter auth workflow example.
  useEffect(() => {
    if (isLoggedIn) {
      history.replace(from);
    }
  }, [from, history, isLoggedIn]);
  return (
    <Flex hAlign="center">
      <Login onSubmit={requestLogin} isLoading={isLoading} />
    </Flex>
  );
}

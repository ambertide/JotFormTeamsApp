import { authRequestAction } from "interfaces/reduxActions";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * A hook that can be used to authenticate the user
 * and get the authentication process.
 * @return isLoading: A boolean that is true
 * while the fetch is in progress, set to
 * false when there is no pending request.
 * @return requestLogin: A callback function
 * that takes the username and password to
 * request login to JotForm.
 */
export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const requestLogin = useCallback(
    (username: string, password: string) => {
      setIsLoading(true);
      dispatch<authRequestAction>({
        type: "AUTH_REQUEST",
        username,
        password,
        onResponse: () => setIsLoading(false),
      });
    },
    [dispatch]
  );
  return { isLoading, requestLogin };
}

import { authRequestAction } from "interfaces/reduxActions";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

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

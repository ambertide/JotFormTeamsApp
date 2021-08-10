import { User } from "../../api/JFApi";
import { LogoutAction, authAction } from "../../interfaces/reduxActions";
import { toast } from "react-toastify";

export default function authReducer(
  state = new User(false, ""),
  action: authAction | LogoutAction
) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return action.newUser;
    case "AUTH_FAIL":
      toast("Wrong email or password.", { type: "error" });
      return state;
    case "AUTH_LOGOUT":
      toast("Logged out of your account.", { type: "info" });
      return new User(false, "");
    default:
      return state;
  }
}

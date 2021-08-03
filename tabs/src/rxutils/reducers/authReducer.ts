import { User } from "../../api/JFApi";
import { authAction } from "../../interfaces/reduxActions";
import { toast } from "react-toastify";

export default function authReducer(state = new User(false, ""), action: authAction) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return action.newUser;
    case "AUTH_FAIL":
      toast("Authentication failed.", { type: "error" });
      return state;
    default:
      return state;
  }
}

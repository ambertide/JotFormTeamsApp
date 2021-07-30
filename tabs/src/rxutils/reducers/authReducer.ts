import { User } from "../../api/JFApi";
import { authAction } from "../../interfaces/reduxActions";

export default function authReducer(state = new User(false, ""), action: authAction) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      console.log(state);
      return action.newUser;
    case "AUTH_FAIL":
      console.log("Authentication errored out!");
      return state;
    default:
      return state;
  }
}

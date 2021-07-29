import { User } from "../../api/User";
import { authAction } from "../../interfaces/reduxActions";

export default function authReducer(state = new User(false, ""), action: authAction) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return action.newUser;
    default:
      return state;
  }
}

import { User } from "../../api/User";
import { authAction } from "../../interfaces/reduxActions";

export default function authReducer(state: User = new User(false, ""), action: authAction) {
  return action.newUser;
}

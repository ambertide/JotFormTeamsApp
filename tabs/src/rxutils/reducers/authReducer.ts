import I from "immutable";
import User from "interfaces/User";
import { LogoutAction, AuthAction, AzureAction } from "interfaces/reduxActions";

export default function authReducer(
  state: User = I.Map({ JFApiKey: "", AzureADToken: "" }),
  action: AuthAction | LogoutAction | AzureAction
) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return state.set("JFApiKey", action.JFAppKey);
    case "AZURE_LOGIN_SUCCESS":
      return state.set("AzureADToken", action.apiKey);
    case "AUTH_LOGOUT":
      return state.set("JFApiKey", "");
    case "AUTH_FAIL":
    case "AZURE_LOGIN_FAIL":
    default:
      return state;
  }
}

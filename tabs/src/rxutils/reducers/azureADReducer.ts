import { AzureAction } from "../../interfaces/reduxActions";
import { toast } from "react-toastify";

export default function azureADReducer(state = "", action: AzureAction) {
  switch (action.type) {
    case "AZURE_LOGIN_SUCCESS":
      if (state === "") {
        toast("Logged in to your Azure AD.", { type: "success" });
      }
      return action.apiKey;
    case "AZURE_LOGIN_FAIL":
      toast("Unable to login to Azure AD.", { type: "error" });
      return state;
    default:
      return state;
  }
}

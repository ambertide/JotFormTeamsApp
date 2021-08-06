import { AzureTeamMetadata } from "../../interfaces/AzureTypes";
import { AzureFetchedTeamsListAction } from "interfaces/reduxActions";
import { toast } from "react-toastify";
import I from "immutable";

export default function azureTeamsReducer(
  state = I.List<AzureTeamMetadata>(),
  action: AzureFetchedTeamsListAction
) {
  switch (action.type) {
    case "AZURE_TEAMS_FETCHED":
      toast("Logged in to your Azure AD.", { type: "success" });
      return action.teams;
    default:
      return state;
  }
}

import { AzureTeamMetadata } from "../../interfaces/AzureTypes";
import { AzureFetchedTeamsListAction } from "interfaces/reduxActions";
import I from "immutable";

export default function azureTeamsReducer(
  state = I.List<AzureTeamMetadata>(),
  action: AzureFetchedTeamsListAction
) {
  switch (action.type) {
    case "AZURE_TEAMS_FETCHED":
      return action.teams;
    default:
      return state;
  }
}

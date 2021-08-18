import { List } from "immutable";
import User from "interfaces/User";
import { AzureTeamMetadata } from "./AzureTypes";
import { JotFormMetadata } from "./JotFormTypes";

export default interface reduxState {
  auth: User;
  forms: List<JotFormMetadata>;
  error: string;
  azureToken: string;
  teams: List<AzureTeamMetadata>;
  themeName: string;
}

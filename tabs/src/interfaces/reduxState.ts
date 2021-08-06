import { List } from "immutable";
import { User } from "../api/JFApi";
import { AzureTeamMetadata } from "./AzureTypes";
import JotFormMetadata from "./JotFormMetadata";

export default interface reduxState {
  auth: User;
  forms: List<JotFormMetadata>;
  error: string;
  azureToken: string;
  teams: List<AzureTeamMetadata>;
}

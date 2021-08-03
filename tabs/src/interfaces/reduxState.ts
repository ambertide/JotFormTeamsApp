import { List } from "immutable";
import { User } from "../api/JFApi";
import JotFormMetadata from "./JotFormMetadata";

export default interface reduxState {
  auth: User;
  forms: List<JotFormMetadata>;
  error: string;
}

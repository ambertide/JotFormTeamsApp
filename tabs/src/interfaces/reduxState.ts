import { List } from "immutable";
import { User } from "../api/JFApi";
import JotFormTable from "./JotFormTable";

export default interface reduxState {
  auth: User;
  forms: List<JotFormTable>;
  error: string;
}

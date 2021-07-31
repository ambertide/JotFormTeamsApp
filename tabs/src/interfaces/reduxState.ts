import { List } from "immutable";
import { User } from "../api/JFApi";
import JotFormForm from "./JotFormForm";

export default interface reduxState {
  auth: User;
  forms: List<JotFormForm>;
  error: string;
}

/**
 * Contains interfaces related to actions, in fact,
 * it is significantly better to write every actions
 * as an interface.
 */
import { User } from "../api/JFApi";

export interface authAction {
  type: "AUTH_SUCCESS" | "AUTH_FAIL";
  newUser?: User;
}

export interface authRequestAction {
  type: "AUTH_REQUEST";
  username: string;
  password: string;
}

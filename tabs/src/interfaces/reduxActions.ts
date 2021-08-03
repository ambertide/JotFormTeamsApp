/**
 * Contains interfaces related to actions, in fact,
 * it is significantly better to write every actions
 * as an interface.
 */
import { List } from "immutable";
import { User } from "../api/JFApi";
import { JotFormData } from "./JotFormData";
import JotFormMetadata from "./JotFormMetadata";

export interface authAction {
  type: "AUTH_SUCCESS" | "AUTH_FAIL";
  newUser?: User;
}

export interface authRequestAction {
  type: "AUTH_REQUEST";
  username: string;
  password: string;
}

export interface formsAction {
  type: "FORMS_FETCHED";
  newForms: List<JotFormMetadata>;
}

export interface formsRequestAction {
  type: "FORMS_REQUEST";
  apiKey: string;
}

export interface errorAction {
  type: "CONN_ERR";
  errorMessage: string;
}

export interface createFormRequestAction {
  type: "FORM_CREATE_REQUEST";
  apiKey: string;
  formData: JotFormData;
}

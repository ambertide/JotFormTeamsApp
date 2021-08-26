/**
 * Contains interfaces related to actions, in fact,
 * it is significantly better to write every actions
 * as an interface.
 */
import { List } from "immutable";
import { AzureTeamMetadata } from "./AzureTypes";
import { JotFormData, JotFormMetadata } from "./JotFormTypes";

export interface AuthAction {
  type: "AUTH_SUCCESS" | "AUTH_FAIL";
  JFAppKey: string;
}

export interface authRequestAction {
  type: "AUTH_REQUEST";
  username: string;
  password: string;
  onResponse: () => void;
}

export interface formsAction {
  type: "FORMS_FETCHED";
  newForms: List<JotFormMetadata>;
}

export interface formsRequestAction {
  type: "FORMS_REQUEST";
  apiKey: string;
  limit?: number;
  offset?: number;
}

export interface FormsResetAction {
  type: "FORMS_RESET";
}

export interface createFormRequestAction {
  type: "FORM_CREATE_REQUEST";
  apiKey: string;
  formData: JotFormData;
}

export interface AzureAction {
  type: "AZURE_LOGIN_SUCCESS" | "AZURE_LOGIN_FAIL";
  apiKey: string;
}

export interface AzureRequestKeyAction {
  type: "AZURE_KEY_REQUEST";
}

export interface AzureErrorAction {
  type: "AZURE_ERROR";
  message: string;
}

export interface AzureFetchedTeamsListAction {
  type: "AZURE_TEAMS_FETCHED";
  teams: List<AzureTeamMetadata>;
}

export interface AzureRequestTeamsListAction {
  type: "AZURE_TEAMS_REQUEST";
}

export interface RequestSendPollAction {
  type: "SEND_POLL_REQUEST";
  apiKey: string;
  formID: string;
  channelID: string;
  teamID: string;
}

export interface LogoutAction {
  type: "AUTH_LOGOUT";
}

export interface ThemeChangeAction {
  type: "THEME_CHANGE";
  newTheme: string;
}

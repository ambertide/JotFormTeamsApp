import reduxState from "interfaces/reduxState";
import { createSelector } from "reselect";

export const selectJFApiKey = (state: reduxState) => state.auth.get("JFApiKey", "");
export const selectAzureADToken = (state: reduxState) => state.auth.get("AzureADToken", "");

/**
 * Check if the user have logged into their JotForm account.
 */
export const selectIsJFAuth = createSelector(
  [selectJFApiKey],
  (JFApiKey: string) => JFApiKey !== ""
);

/**
 * Check if the user have logged into their Azure AD account.
 */
export const selectIsAzureADAuth = createSelector(
  [selectAzureADToken],
  (AzureADToken) => AzureADToken !== ""
);

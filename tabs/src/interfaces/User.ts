import I from "immutable";
type User = I.Map<"JFApiKey" | "AzureADToken" | string, string>;

export default User;

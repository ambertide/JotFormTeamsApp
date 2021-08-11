import pollTemplate from "../cards/poll.json";
import * as ACData from "adaptivecards-templating";
import { UserContent, UserFormContent } from "interfaces/JotFormTypes";
const template = new ACData.Template(pollTemplate);

export function generateAdaptiveCard(user: UserContent, form: UserFormContent, apiKey: string) {
  user.avatarUrl = "https:" + user.avatarUrl;
  return template.expand({
    $root: {
      user,
      form,
      apiKey,
    },
  });
}

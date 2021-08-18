import pollTemplate from "../cards/poll.json";
import formTemplate from "../cards/form.json";
import * as ACData from "adaptivecards-templating";
import { UserContent, UserFormContent } from "interfaces/JotFormTypes";
const template = new ACData.Template(pollTemplate);
const errTemplate = new ACData.Template(formTemplate); // Used for non-poll forms.

export function generateAdaptiveCard(
  user: UserContent,
  form: UserFormContent,
  apiKey: string,
  uuid: string, // Will be used by the proxy server to identify our user.
  isPoll: boolean // If the form is a poll.
) {
  user.avatarUrl = "https:" + user.avatarUrl;
  if (isPoll) {
    return template.expand({
      $root: {
        user,
        form,
        apiKey,
        uuid,
      },
    });
  } else {
    return errTemplate.expand({
      $root: {
        user,
        form,
        apiKey,
      },
    });
  }
}

import pollTemplate from "../cards/poll.json";
import formTemplate from "../cards/form.json";
import * as ACData from "adaptivecards-templating";
import { UserContent, UserFormContent } from "interfaces/JotFormTypes";
const template = new ACData.Template(pollTemplate);
const errTemplate = new ACData.Template(formTemplate); // Used for non-poll forms.

/**
 * Generate an adaptive card to be sent to an Office Product
 * to open a form/poll.
 * @param user User owning the form/poll.
 * @param form Data of the form/poll.
 * @param apiKey App key used to interract with JF Api.
 * @param uuid UUID used by the proxy server.
 * @param isPoll If true, poll variant is used.
 * @returns The data associated with the adaptive card,
 * which has two variants for the form and the poll.
 */
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

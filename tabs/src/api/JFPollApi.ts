import { getForm, getUser } from "./JFApi";
import { postAdaptiveCardToChannel } from "./AzureADApi";
import { generateAdaptiveCard } from "templates/generators/cardGenerators";
export async function sendPollToTeam(
  teamID: string,
  channelID: string,
  formID: string,
  apiKey: string
) {
  const formData = await getForm(apiKey, formID);
  const userData = await getUser(apiKey);
  const adaptiveCard = generateAdaptiveCard(userData, formData);
  await postAdaptiveCardToChannel(teamID, channelID, adaptiveCard);
}

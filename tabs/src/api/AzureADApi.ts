import I from "immutable";
import { Providers } from "@microsoft/mgt";
import {
  AzureChannelMetadata,
  AzureListChannelResponse,
  AzureListTeamsResponse,
  AzureTeamMetadata,
} from "interfaces/AzureTypes";
import { generateGUID } from "@microsoft/teams-js";
export async function getUserToken(): Promise<string> {
  const token = await Providers.globalProvider.getAccessToken();
  return token;
}

export async function getUserTeams(): Promise<I.List<AzureTeamMetadata>> {
  const teams: AzureListTeamsResponse = await Providers.client.api("/me/joinedTeams").get();
  return I.List(teams.value);
}

export async function getChannelsInTeam(teamID: string): Promise<I.List<AzureChannelMetadata>> {
  const channels: AzureListChannelResponse = await Providers.client
    .api(`/teams/${teamID}/channels`)
    .get();
  return I.List(channels.value);
}

export async function postMessageToChannel(
  teamID: string,
  channelID: string,
  content: string
): Promise<void> {
  await Providers.client
    .api(`/teams/${teamID}/channels/${channelID}/messages`)
    .post({ body: { content: content } });
}

export async function postAdaptiveCardToChannel(
  teamID: string,
  channelID: string,
  adaptiveCard: object
): Promise<void> {
  const attachment_id = "4523423432432423432423";
  const chatMessage = {
    body: { contentType: "html", content: `<attachment id=\"${attachment_id}\"></attachment>` },
    attachments: [
      {
        id: attachment_id,
        contentType: "application/vnd.microsoft.card.adaptive",
        content: JSON.stringify(adaptiveCard),
      },
    ],
  };
  const response = await Providers.client
    .api(`/teams/${teamID}/channels/${channelID}/messages`)
    .post(chatMessage);
}

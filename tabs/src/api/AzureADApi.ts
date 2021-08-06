import I from "immutable";
import { Providers } from "@microsoft/mgt";
import {
  AzureChannelMetadata,
  AzureListChannelResponse,
  AzureListTeamsResponse,
  AzureTeamMetadata,
} from "interfaces/AzureTypes";
export async function getUserToken(): Promise<string> {
  const token = await Providers.globalProvider.getAccessToken();
  return token;
}

export async function getUserTeams(): Promise<I.List<AzureTeamMetadata>> {
  const teams: AzureListTeamsResponse = await Providers.client.api("/me/joinedTeams").get();
  console.log(teams);
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

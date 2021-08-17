import { getForm, getUser } from "./JFApi";
import { postAdaptiveCardToChannel } from "./AzureADApi";
import { generateAdaptiveCard } from "templates/generators/cardGenerators";
import axios from "axios";
import { FrequencyResponseObject, PollRegisterResponse } from "interfaces/PollAPITypes";
import {
  FormQuestionsResponse,
  PostSubmissionRequest,
  QuestionResponse,
  SubmissionResponse,
} from "interfaces/JotFormTypes";

const poll_proxy_base_url = "https://ambertide-jfteams-proxy.herokuapp.com";

/**
 * Given its components, construct a URL.
 */
const constructURL = (...args: string[]) => {
  return args.reduce((reduction, param, _) => reduction + "/" + param, poll_proxy_base_url);
};

export async function sendPollToTeam(
  teamID: string,
  channelID: string,
  formID: string,
  apiKey: string
) {
  const formData = await getForm(apiKey, formID);
  const userData = await getUser(apiKey);
  const uuid = await registerUser(apiKey, formID); // Register the user to the proxy server.
  const adaptiveCard = generateAdaptiveCard(userData, formData, apiKey, uuid);
  await postAdaptiveCardToChannel(teamID, channelID, adaptiveCard);
}

/**
 * Register a user associated with a poll in the proxy API.
 */
export async function registerUser(appKey: string, pollID: string): Promise<string> {
  const response = await axios.post<PollRegisterResponse>(constructURL("poll"), {
    appKey,
    pollID,
  });
  return response.data.uuid;
}

/**
 * Get statistics for the each answer of a poll.
 * @param uuid Unique ID returned from the registration endpoint.
 */
export async function getPollStats(uuid: string): Promise<FrequencyResponseObject> {
  const response = await axios.get<FrequencyResponseObject>(constructURL("poll", uuid, "stats"));
  return response.data;
}

/**
 * Get form questions via the proxy server.
 * @param uuid Unique ID returned from the registration endpoint.
 */
export async function getPollQuestions(uuid: string): Promise<QuestionResponse[]> {
  const response = await axios.get<FormQuestionsResponse>(constructURL("poll", uuid, "questions"));
  return Object.values(response.data.content);
}

/**
 * Post a submission via the proxy server.
 * @param uuid Unique ID returned from the registration endpoint.
 */
export async function postSubmissionByProxy(
  uuid: string,
  submission: PostSubmissionRequest
): Promise<boolean> {
  const response = await axios.put<SubmissionResponse>(constructURL("poll", uuid), submission);
  return response && response.status === 200;
}

/**
 * Wake the proxy up.
 */
export async function pingProxy() {
  await axios.get(constructURL("ping"));
}

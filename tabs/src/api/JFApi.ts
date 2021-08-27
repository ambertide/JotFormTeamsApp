import axios, { AxiosResponse } from "axios";
import { List } from "immutable";
import {
  LoginResponse,
  UserFormContent,
  SpecificFormResponse,
  UserContent,
  UserResponse,
  QuestionResponse,
  FormQuestionsResponse,
  JotFormData,
  JotFormMetadata,
  PostSubmissionRequest,
  FormSubmissionResponse,
  FormSubmissionResponseContent,
  BaseResponse,
  UserFormResponse,
} from "interfaces/JotFormTypes";
import { addDecorativeFields } from "utils/JFUtils";
import { LoginException } from "./exceptions";

export async function login(username: string, password: string): Promise<string> {
  const response: AxiosResponse<LoginResponse> = await axios({
    method: "post",
    url: "https://api.jotform.com/user/login",
    params: {
      username: username,
      password: password,
      appName: "JotForm Teams Integration",
      access: "full",
    },
  });
  if (response.data.responseCode === 401) {
    throw new LoginException("An error has occurred with login.");
  }
  return response.data.content.appKey;
}

export async function getTables(
  appKey: string,
  offset = 0,
  limit = 20
): Promise<List<JotFormMetadata>> {
  const response = await axios.get<UserFormResponse>("https://api.jotform.com/user/forms", {
    params: {
      apiKey: appKey,
      offset: offset,
      limit: limit,
    },
  });
  return List(response.data.content).map((formData) => {
    return {
      id: formData.id,
      title: formData.title,
      url: formData.url,
      status: formData.status,
      created_at: formData.created_at,
      updated_at: formData.updated_at,
      count: Number.parseInt(formData.count),
    };
  });
}

export async function postForm(apiKey: string, formData: JotFormData): Promise<void> {
  addDecorativeFields(formData);
  await axios.put("https://api.jotform.com/form", formData, {
    params: { apiKey: apiKey, orderBy: "created_at" },
  });
}

export async function getForm(apiKey: string, formID: string): Promise<UserFormContent> {
  const response = await axios.get<SpecificFormResponse>(`https://api.jotform.com/form/${formID}`, {
    params: {
      apiKey: apiKey,
    },
  });
  return response.data.content;
}

export async function getFormQuestions(
  apiKey: string,
  formID: string
): Promise<QuestionResponse[]> {
  const response = await axios.get<FormQuestionsResponse>(
    `https://api.jotform.com/form/${formID}/questions`,
    {
      params: {
        apiKey: apiKey,
      },
    }
  );
  return Object.values(response.data.content);
}

export async function getUser(apiKey: string): Promise<UserContent> {
  const response = await axios.get<UserResponse>(`https://api.jotform.com/user`, {
    params: {
      apiKey,
    },
  });
  return response.data.content;
}

export async function postSubmission(
  apiKey: string,
  formID: string,
  submission: PostSubmissionRequest
): Promise<boolean> {
  const response = await axios.put<BaseResponse>(
    `https://api.jotform.com/form/${formID}/submissions`,
    submission,
    { params: { apiKey } }
  );
  return response && response.status === 200;
}

/**
 * Get submissions done of a form.
 * @param limit: Is the number of forms to be fetched,
 * maximum value of this is 1000.
 * @param offset: Is the offset in the number of forms
 * being fetched.
 * @example limit = 20 and offset = 40 will bring the
 * submissions between 40 and 60.
 */
export async function getFormSubmissions(
  apiKey: string,
  formID: string,
  limit: number,
  offset: number
): Promise<FormSubmissionResponseContent[]> {
  const response = await axios.get<FormSubmissionResponse>(
    `https://api.jotform.com/form/${formID}/submissions`,
    {
      params: { apiKey, limit, offset, filter: '{"status:ne":"DELETED"}', orderby: "created_at" },
    }
  );
  return response.data.content;
}

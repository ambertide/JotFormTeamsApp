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
  SubmissionResponse,
  JotFormData,
  JotFormMetadata,
  PostSubmissionRequest,
  FormSubmissionResponse,
  FormSubmissionResponseContent,
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

export async function getTables(appKey: string): Promise<List<JotFormMetadata>> {
  const response = await axios({
    method: "get",
    url: "https://api.jotform.com/user/forms",
    params: {
      apiKey: appKey,
    },
  });
  const formData: any[] = response.data.content;
  return List(
    formData.map((formData) => {
      return {
        id: formData.id,
        title: formData.title,
        url: formData.url,
        status: formData.status,
        created_at: formData.created_at,
        updated_at: formData.updated_at,
        count: formData.count,
      };
    })
  );
}

export async function postForm(apiKey: string, formData: JotFormData): Promise<void> {
  addDecorativeFields(formData);
  await axios.put("https://api.jotform.com/form", formData, {
    params: { apiKey: apiKey },
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
  const response = await axios.put<SubmissionResponse>(
    `https://api.jotform.com/form/${formID}/submissions`,
    submission,
    { params: { apiKey } }
  );
  return response && response.status === 200;
}

/**
 * Get submissions done of a form.
 */
export async function getFormSubmissions(
  apiKey: string,
  formID: string
): Promise<FormSubmissionResponseContent[]> {
  const response = await axios.get<FormSubmissionResponse>(
    `https://api.jotform.com/form/${formID}/submissions`,
    {
      params: { apiKey },
    }
  );
  return response.data.content;
}

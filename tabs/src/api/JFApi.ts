import axios, { AxiosResponse } from "axios";
import { List } from "immutable";
import { LoginResponse } from "interfaces/JotFormApiResponses";
import { JotFormData } from "interfaces/JotFormData";
import JotFormMetadata from "interfaces/JotFormMetadata";
import { LoginException } from "./exceptions";
export class User {
  isAuth: boolean;
  APIKey: string;

  constructor(isAuth: boolean = false, APIKey: string = "") {
    this.isAuth = isAuth;
    this.APIKey = APIKey;
  }
}

export async function login(username: string, password: string): Promise<User> {
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
  const userAPIKey = response.data.content.appKey;
  console.log(userAPIKey);
  return new User(true, userAPIKey);
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
  const JSONFormData = {
    properties: { title: formData.properties.title },
    questions: formData.questions.toObject(),
  };
  console.log(JSONFormData);
  await axios.put("https://api.jotform.com/form", JSONFormData, {
    params: { apiKey: apiKey },
  });
}

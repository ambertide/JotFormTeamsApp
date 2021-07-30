import axios from "axios";
import { List } from "immutable";
import JotFormTable from "interfaces/JotFormTable";
export class User {
  isAuth: boolean;
  APIKey: string;

  constructor(isAuth: boolean = false, APIKey: string = "") {
    this.isAuth = isAuth;
    this.APIKey = APIKey;
  }
}

export async function login(username: string, password: string): Promise<User> {
  const response = await axios({
    method: "post",
    url: "https://api.jotform.com/user/login",
    params: {
      username: username,
      password: password,
      appName: "JotForm Teams Integration",
      access: "full",
    },
  });
  const userAPIKey = response.data.content.appKey;
  return new User(true, userAPIKey);
}

export async function getTables(appKey: string): Promise<List<JotFormTable>> {
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

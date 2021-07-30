import axios from "axios";
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
  const userAPIKey = response.data.appKey;
  return new User(true, userAPIKey);
}

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
  window.JF.initialize({
    accessType: "full",
    appName: "JotForm Polls",
  });
  window.JF.login(
    () => {
      const apiKey = window.JF.getAPIKey();
      console.log(apiKey);
    },
    () => {},
    () => {},
    true
  );

  /**
  debugger;
  axios({
    method: "get",
    url: "https://api.jotform.com/user/forms",
    params: {
      apikey: apiKey,
    },
  });
  */
  return new User(true, "");
}

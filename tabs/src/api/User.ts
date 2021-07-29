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
    url: "api.jotform.com/user",
    data: {
      username: username,
      password: password,
    },
  });
  console.log(response);
  return new User(true, response.data);
}

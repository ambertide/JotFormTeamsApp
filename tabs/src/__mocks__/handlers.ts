import { BaseResponse, LoginResponse } from "interfaces/JotFormTypes";
import { rest } from "msw";
import I from "immutable";

interface LoginRequestParams {
  username: string;
  password: string;
}

const baseFormData = I.Map({
  id: "",
  username: "",
  title: "My Form",
  height: "",
  status: "",
  created_at: "",
  updated_at: "",
  last_submission: null,
  new: "0",
  count: "0",
  type: "LEGACY",
  url: "",
});

export const handlers = [
  rest.post<any, LoginResponse | BaseResponse, LoginRequestParams>(
    "https://api.jotform.com/user/login",
    (req, res, ctx) => {
      const username = req.url.searchParams.get("username");
      const password = req.url.searchParams.get("password");
      if (username === "test" && password === "test") {
        return res(
          ctx.status(200),
          ctx.json({
            responseCode: 200,
            message: "Logged in",
            content: {
              username: "test",
              name: "Test",
              email: "test@test.com",
              website: "test",
              time_zone: "UTC+3",
              account_type: "test",
              status: "ENABLED",
              created_at: "",
              updated_at: "",
              usage: "",
              industry: "",
              securityAnswer: "",
              company: "",
              securityQuestion: "",
              webhooks: "",
              doNotClone: "",
              folderLayout: "",
              language: "",
              avatarUrl: "",
              appKey: "TESTKEY",
            },
            "limit-left": 234324,
          })
        );
      } else {
        return res(
          ctx.status(200),
          ctx.json({
            responseCode: 401,
            message: "You're not authorised to use (/user/login) ",
            content: [],
            "limit-left": 234324,
          })
        );
      }
    }
  ),
  rest.get<any, any, any>("https://api.jotform.com/user/forms", (req, res, ctx) => {
    const { limit, offset } = Object.fromEntries(req.url.searchParams);
    const forms = I.Range(Number.parseInt(offset), Number.parseInt(offset) + Number.parseInt(limit))
      .map((index) => baseFormData.set("id", `${index}`))
      .toJS();
    console.log(forms);
    return res(ctx.status(200), ctx.json(forms));
  }),
];

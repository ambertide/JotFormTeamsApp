export interface BaseResponse {
  responseCode: number;
  message: string;
  content: any;
  "limit-left": number;
}

interface LoginContent {
  username: string;
  name: string;
  email: string;
  website: string;
  time_zone: string;
  account_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  usage: string;
  industry: string;
  securityAnswer: string;
  company: string;
  securityQuestion: string;
  webhooks: string;
  doNotClone: string;
  folderLayout: string;
  language: string;
  avatarUrl: string;
  appKey: string;
}

export interface LoginResponse extends BaseResponse {
  content: LoginContent;
}

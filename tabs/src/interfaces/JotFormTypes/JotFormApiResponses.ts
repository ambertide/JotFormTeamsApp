import { ValidationType } from "interfaces/ValidationTypes";
import {
  JFBoolean,
  StringAsNumber,
  PollQuestionType,
  SubmissionFieldAnswer,
} from "./JotFormCommons";

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

export interface UserFormContent {
  id: string;
  username: string;
  title: string;
  height: string;
  url: string;
  status: string;
  created_at: string;
  updated_at: string;
  new: string;
  count: string;
}

export interface UserFormResponse extends BaseResponse {
  content: UserFormContent[];
}

export interface SpecificFormResponse extends BaseResponse {
  content: UserFormContent;
}

export interface UserContent {
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
}

export interface UserResponse extends BaseResponse {
  content: UserContent;
}

export interface QuestionResponse {
  name: string;
  labelAlign?: string;
  order: string;
  required: JFBoolean;
  shrink?: string;
  qid: string;
  type: string;
  text?: string;
}

export interface FullNameQuestionResponse extends QuestionResponse {
  middle?: string;
  prefix?: string;
  readonly?: string;
  sublabels?: FullNameSublabels;
  suffix?: string;
  text: string;
  type: "control_fullname";
}

interface FullNameSublabels {
  prefix: string;
  first: string;
  middle: string;
  last: string;
  suffix: string;
}

export interface TextBoxQuestionResponse extends QuestionResponse {
  hint?: string;
  readonly?: string;
  size?: string;
  text: string;
  type: "control_textbox";
  validation: ValidationType;
}

export interface SelectQuestionResponse extends QuestionResponse {
  allowOther: JFBoolean;
  options: string;
  otherText?: string;
  required: JFBoolean;
  special: "None" | "Gender" | "Days" | "Months";
  text: string;
  type: "control_radio" | "control_checkbox";
}

export type PollRestricted =
  | SelectQuestionResponse
  | FullNameQuestionResponse
  | TextBoxQuestionResponse;

interface QuestionMap {
  [key: string]: QuestionResponse;
}

export interface FormQuestionsResponse extends BaseResponse {
  content: QuestionMap;
}

/**
 * Returned when requesting form response.
 */
export interface FormSubmissionResponse extends BaseResponse {
  resultSet: ResultSet;
  content: FormSubmissionResponseContent[];
}

interface ResultSet {
  offset: number;
  limit: number;
  count: number;
}

export interface FormSubmissionResponseContent {
  id: string;
  form_id: string;
  ip: string;
  created_at: string;
  status: string;
  new: string;
  flag: string;
  notes: string;
  updated_at?: string;
  answers: Answers;
}

export interface Answers {
  [qid: string]: FormSubmissionAnswer;
}

export interface FormSubmissionAnswer {
  name: string /** Not really important (or meaningful). Can repeat. */;
  order: StringAsNumber /** Order of the question in the form, might be nice to sort according to. */;
  text: string /** Text of the question. */;
  type: PollQuestionType | string /** Type of the question. */;
  answer?: SubmissionFieldAnswer | string[];
  prettyFormat?: string;
}

import I from "immutable";
import { ValidationType } from "interfaces/ValidationTypes";

export type JFBoolean = "Yes" | "No";
export type StringAsNumber = `${number}`;
export type PollQuestionType =
  | "control_textbox"
  | "control_fullname"
  | "control_radio"
  | "control_checkbox";

export type BasicQuestion = {
  type: string;
  text: string;
  required?: JFBoolean;
};

export interface TextBoxQuestion extends BasicQuestion {
  type: "control_textbox";
  validation: ValidationType;
  maxsize: StringAsNumber;
}

export interface FullNameQuestion extends BasicQuestion {
  type: "control_fullname";
  prefix?: JFBoolean;
  middle?: JFBoolean;
  suffix?: JFBoolean;
}

export interface BaseChoiceQuestion extends BasicQuestion {
  text: string;
  required: JFBoolean;
  allowOther: JFBoolean;
  options: string; // Options separated by |
  otherText: string;
  special: "None" | "Gender" | "Days" | "Months";
  selected?: string; // Default selected value.
  checked?: JFBoolean; // Should be true if selected exists.
}

export interface RadioQuestion extends BaseChoiceQuestion {
  type: "control_radio";
}

export interface CheckboxQuestion extends BaseChoiceQuestion {
  type: "control_checkbox";
}

export interface HeaderQuestion extends BasicQuestion {
  type: "control_head";
}

export interface SubmitQuestion extends BasicQuestion {
  type: "control_button";
}

export type JotFormQuestionData =
  | FullNameQuestion
  | TextBoxQuestion
  | RadioQuestion
  | CheckboxQuestion
  | HeaderQuestion
  | SubmitQuestion;

type JotFormProperties = {
  title: string;
};

export interface JotFormData {
  properties: JotFormProperties;
  questions: I.Map<StringAsNumber, JotFormQuestionData>;
}

export interface JotFormMetadata {
  id: string;
  title: string;
  url: string;
  status: "ENABLED" | "DISABLED";
  created_at: string;
  updated_at: string;
  count: number;
}

export interface FullNameAnswer {
  first: string;
  last: string;
  prefix?: string;
  middle?: string;
  suffix?: string;
}

interface TextAnswer {
  text: string;
}

export type SubmissionFieldAnswer = FullNameAnswer | I.List<string> | TextAnswer;

import I from "immutable";

export type JFBoolean = "Yes" | "No";
export type StringAsNumber = `${number}`;

export type BasicQuestion = {
  text: string;
  required: JFBoolean;
};

export interface TextBoxQuestion extends BasicQuestion {
  type: "control_textbox";
  validation: "None" | "Email" | "AlphaNumeric" | "Alphabetic" | "Numeric" | "URL";
  size: StringAsNumber;
}

export interface FullNameQuestion extends BasicQuestion {
  type: "control_fullname";
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

export type JotFormQuestionData =
  | FullNameQuestion
  | TextBoxQuestion
  | RadioQuestion
  | CheckboxQuestion;

type JotFormProperties = {
  title: string;
};

export interface JotFormData {
  properties: JotFormProperties;
  questions: I.Map<StringAsNumber, JotFormQuestionData>;
}

import I from "immutable";

export type JFBoolean = "Yes" | "No";
export type StringAsNumber = `${number}`;

export type TextBoxQuestion = {
  type: "control_textbox";
  text: string;
  required: JFBoolean;
  validation: "None" | "Email" | "AlphaNumeric" | "Alphabetic" | "Numeric" | "URL";
  size: StringAsNumber;
};

export type FullNameQuestion = {
  type: "control_fullname";
  text: string;
  required: JFBoolean;
};

export type JotFormQuestionData = FullNameQuestion | TextBoxQuestion;

type JotFormProperties = {
  title: string;
};


export interface JotFormData {
  properties: JotFormProperties;
  questions: I.Map<StringAsNumber, JotFormQuestionData>;
}

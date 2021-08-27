import I from "immutable";
import {
  CheckboxQuestion,
  FullNameQuestion,
  JotFormQuestionData,
  RadioQuestion,
  TextBoxQuestion,
} from "interfaces/JotFormTypes";
import FullNameFragment from "./FullNameFragment";
import SelectionFragment from "./SelectionFragment";
import TextBoxFragment from "./TextBoxFragment";

export type QuestionType =
  | "control_textbox"
  | "control_fullname"
  | "control_radio"
  | "control_checkbox";
export type QuestionTypeName = "Text Box" | "Full Name" | "Single Choice" | "Multiple Choice";
export const questionTypeNames = ["Text Box", "Full Name", "Single Choice", "Multiple Choice"];
export const questionTypes = I.Map<QuestionTypeName, QuestionType>({
  "Text Box": "control_textbox",
  "Full Name": "control_fullname",
  "Single Choice": "control_radio",
  "Multiple Choice": "control_checkbox",
});

export const questionTypesReverseLookup = I.Map<QuestionType, QuestionTypeName>({
  control_textbox: "Text Box",
  control_fullname: "Full Name",
  control_radio: "Single Choice",
  control_checkbox: "Multiple Choice",
});

export interface QuestionBuilderProps {
  /**
   * Represents the initial parameters given to the question, this
   * will populate the fields.
   */
  initialState?: JotFormQuestionData;
  /**
   * Callback used to save the question to the global state.
   */
  onSaveQuestion: (question: JotFormQuestionData) => void;
  /** Title of the secondary button. */
  secondaryButtonTitle: string;
  /** Action of the secondary button */
  onClickSecondary: () => void;
  /** True if the component is in lite mode. */
  isLite: boolean;
  /**
   * Text of the primary button.
   */
  buttonTitle?: string;
  /**
   * If set to true, the button will be disabled.
   */
  secondaryButtonDisabled?: boolean;
}

/**
 * Construct and return a question fragment.
 * @param questionType Type of the question.
 * @param initialState Initial state of the fields of the question.
 * @param setFieldValidity Callback to set the validity of a field.
 * @param addPropertyToQuestion Add a property to the question overall.
 * @returns The question fragment component.
 */
export default function getQuestionFragment(
  questionType: QuestionType,
  setFieldValidity: (fieldID: string, validity: boolean) => void,
  addPropertyToQuestion: (propertyKey: string, propertyValue: string | number) => void,
  initialState?: JotFormQuestionData
) {
  switch (questionType) {
    case "control_fullname":
      return (
        <FullNameFragment
          addPropertyToQuestion={addPropertyToQuestion}
          initialState={initialState as FullNameQuestion}
        />
      );
    case "control_textbox":
      return (
        <TextBoxFragment
          addPropertyToQuestion={addPropertyToQuestion}
          initialState={initialState as TextBoxQuestion}
          setValidity={setFieldValidity}
        />
      );
    case "control_radio":
    case "control_checkbox":
      return (
        <SelectionFragment
          addPropertyToQuestion={addPropertyToQuestion}
          initialState={initialState as RadioQuestion | CheckboxQuestion}
        />
      );
    default:
      return null;
  }
}

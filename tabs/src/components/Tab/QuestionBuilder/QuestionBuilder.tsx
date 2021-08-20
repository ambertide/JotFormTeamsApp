import "./../../Components.css";
import {
  Button,
  Flex,
  Form,
  FormButton,
  FormCheckbox,
  FormDropdown,
  FormInput,
} from "@fluentui/react-northstar";
import { useState } from "react";
import I from "immutable";
import { useCallback } from "react";
import TextBoxFragment from "./TextBoxFragment";
import FullNameFragment from "./FullNameFragment";
import SelectionFragment from "./SelectionFragment";
import {
  CheckboxQuestion,
  FullNameQuestion,
  JotFormQuestionData,
  RadioQuestion,
  TextBoxQuestion,
} from "interfaces/JotFormTypes";

type QuestionType = "control_textbox" | "control_fullname" | "control_radio" | "control_checkbox";
type QuestionTypeName = "Text Box" | "Full Name" | "Single Choice" | "Multiple Choice";
const questionTypeNames = ["Text Box", "Full Name", "Single Choice", "Multiple Choice"];
const questionTypes = I.Map<QuestionTypeName, QuestionType>({
  "Text Box": "control_textbox",
  "Full Name": "control_fullname",
  "Single Choice": "control_radio",
  "Multiple Choice": "control_checkbox",
});

const questionTypesReverseLookup = I.Map<QuestionType, QuestionTypeName>({
  control_textbox: "Text Box",
  control_fullname: "Full Name",
  control_radio: "Single Choice",
  control_checkbox: "Multiple Choice",
});
interface QuestionBuilderProps {
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
}

export default function QuestionBuilder(props: QuestionBuilderProps) {
  const {
    onSaveQuestion,
    secondaryButtonTitle,
    onClickSecondary,
    isLite,
    initialState,
    buttonTitle = "Add Question",
  } = props;
  const [questionType, setQuestionType] = useState<QuestionType>(
    (initialState?.type as any) || "control_textbox"
  );
  const [questionName, setQuestionName] = useState<QuestionTypeName>(
    questionTypesReverseLookup.get(questionType, "Text Box")
  );
  const [questionProperties, setQuestionProperties] = useState<I.Map<string, string | number>>(
    I.Map<string, string | number>(
      initialState
        ? (initialState as any)
        : { required: "No", text: "My Question", type: "control_textbox" }
    )
  );
  const addPropertyToQuestion = useCallback(
    // Adds a property to the active question.
    (propertyKey: string, propertyValue: string | number) => {
      setQuestionProperties((previousQuestionProperties) =>
        previousQuestionProperties.set(propertyKey, propertyValue)
      );
    },
    [setQuestionProperties]
  );
  const getQuestionFragment = (questionType: QuestionType) => {
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
  };
  return (
    <Flex column>
      <Form
        className={isLite ? "lite" : ""}
        onSubmit={() => {
          onSaveQuestion(questionProperties.toObject() as unknown as JotFormQuestionData);
        }}
      >
        <FormInput
          label="Question title"
          id="QuestionTitle"
          key="QuestionTitle"
          value={questionProperties.get("text")}
          onChange={(event, data) => {
            setQuestionProperties((previousQuestionProperties) =>
              previousQuestionProperties.set("text", data?.value || "")
            );
          }}
        />
        <FormDropdown
          styles={{ minWidth: "12px" }}
          items={questionTypeNames}
          value={questionName}
          onChange={(event, data) => {
            setQuestionProperties((previousProperties) => {
              const { required, text } = previousProperties.toObject();
              const cleared = previousProperties.clear();
              return cleared.concat({ required, text });
            }); // Reset the properties.
            const qType = questionTypes.get(data.value as QuestionTypeName);
            addPropertyToQuestion("type", qType || "control_textbox");
            setQuestionType(qType as QuestionType);
            setQuestionName(data.value as QuestionTypeName);
          }}
          label="Question Type"
          checkable
          getA11ySelectionMessage={{ onAdd: (item) => `${item} has been selected.` }}
        />
        <FormCheckbox
          label="Required"
          checked={questionProperties.get("required", "No") === "Yes"}
          onChange={(event, data) => {
            addPropertyToQuestion("required", data?.checked ? "Yes" : "No");
          }}
        />
        {getQuestionFragment(questionType)}
        <Flex gap="gap.smaller">
          <FormButton content={buttonTitle} primary />
          <Button content={secondaryButtonTitle} onClick={onClickSecondary} />
        </Flex>
      </Form>
    </Flex>
  );
}

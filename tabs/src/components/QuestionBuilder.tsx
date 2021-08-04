import "./Components.css";
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
import TextBoxFragment from "./QuestionFragments/TextBoxFragment";
import FullNameFragment from "./QuestionFragments/FullNameFragment";
import SelectionFragment from "./QuestionFragments/SelectionFragment";
import { JotFormQuestionData } from "interfaces/JotFormData";

type QuestionType = "control_textbox" | "control_fullname" | "control_radio" | "control_checkbox";
type QuestionTypeName = "Text Box" | "Full Name" | "Single Choice" | "Multiple Choice";
const questionTypeNames = ["Text Box", "Full Name", "Single Choice", "Multiple Choice"];
const questionTypes = I.Map<QuestionTypeName, QuestionType>({
  "Text Box": "control_textbox",
  "Full Name": "control_fullname",
  "Single Choice": "control_radio",
  "Multiple Choice": "control_checkbox",
});
interface QuestionBuilderProps {
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
}

export default function QuestionBuilder(props: QuestionBuilderProps) {
  const { onSaveQuestion, secondaryButtonTitle, onClickSecondary, isLite } = props;
  const [questionType, setQuestionType] = useState<QuestionType>("control_textbox");
  const [questionName, setQuestionName] = useState<QuestionTypeName>("Text Box");
  const [questionProperties, setQuestionProperties] = useState<I.Map<string, string | number>>(
    I.Map<string, string | number>({ required: "No", text: "My Question", type: "control_textbox" })
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
        return <FullNameFragment addPropertyToQuestion={addPropertyToQuestion} />;
      case "control_textbox":
        return <TextBoxFragment addPropertyToQuestion={addPropertyToQuestion} />;
      case "control_radio":
      case "control_checkbox":
        return <SelectionFragment addPropertyToQuestion={addPropertyToQuestion} />;
      default:
        return null;
    }
  };
  return (
    <Flex column>
      <Form className={isLite ? "lite" : ""}>
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
              let cleared = previousProperties.clear();
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
          onChange={(event, data) => {
            addPropertyToQuestion("required", data?.checked ? "Yes" : "No");
          }}
        />
        {getQuestionFragment(questionType)}
        <Flex gap="gap.smaller">
          <FormButton
            content="Add"
            primary
            onClick={() => {
              onSaveQuestion(questionProperties.toObject() as unknown as JotFormQuestionData);
            }}
          />
          <Button content={secondaryButtonTitle} onClick={onClickSecondary} />
        </Flex>
      </Form>
    </Flex>
  );
}

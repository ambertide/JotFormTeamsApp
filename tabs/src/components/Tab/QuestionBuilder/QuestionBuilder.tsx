import "./../../Components.css";
import {
  Button,
  Flex,
  Form,
  FormButton,
  FormCheckbox,
  Text,
  FormDropdown,
  FormInput,
} from "@fluentui/react-northstar";
import { useState } from "react";
import I from "immutable";
import { useCallback } from "react";
import { JotFormQuestionData } from "interfaces/JotFormTypes";
import useTransientFormValidation from "hooks/useTransientFormValidation";
import { useMemo } from "react";
import getQuestionFragment, {
  QuestionBuilderProps,
  QuestionType,
  QuestionTypeName,
  questionTypeNames,
  questionTypes,
  questionTypesReverseLookup,
} from "./ QuestionFragmentCommons";

/**
 * Used to build a single question using different
 * widget types.
 */
export default function QuestionBuilder({
  onSaveQuestion,
  secondaryButtonTitle,
  onClickSecondary,
  isLite,
  initialState,
  buttonTitle = "Add Question",
  secondaryButtonDisabled = false,
}: QuestionBuilderProps) {
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
  const doesNotNeedValidation = useCallback(
    () => questionType !== "control_textbox",
    [questionType]
  );
  const { isFormValid, setFieldValidity, resetValidityMap } =
    useTransientFormValidation(doesNotNeedValidation);
  const addPropertyToQuestion = useCallback(
    // Adds a property to the active question.
    (propertyKey: string, propertyValue: string | number) => {
      setQuestionProperties((previousQuestionProperties) =>
        previousQuestionProperties.set(propertyKey, propertyValue)
      );
    },
    [setQuestionProperties]
  );
  const questionFragment = useMemo(
    () => getQuestionFragment(questionType, setFieldValidity, addPropertyToQuestion, initialState),
    [questionType, initialState, setFieldValidity, addPropertyToQuestion, getQuestionFragment]
  );
  return (
    <Flex styles={{ maxWidth: "fit-content" }} column>
      <Form className={isLite ? "lite" : ""}>
        <FormInput
          fluid
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
            // When dropdown changes, also
            resetValidityMap(); // Reset the validity states.
            setQuestionProperties((previousProperties) => {
              // And the question properties
              const { required, text } = previousProperties.toObject(); // Except the common ones.
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
          toggle
          checked={questionProperties.get("required", "No") === "Yes"}
          onChange={(event, data) => {
            addPropertyToQuestion("required", data?.checked ? "Yes" : "No");
          }}
        />
        {questionFragment}
        <Flex gap="gap.smaller" column>
          <Flex gap="gap.smaller">
            <FormButton
              content={buttonTitle}
              disabled={isFormValid ? false : true}
              primary
              onClick={() => {
                onSaveQuestion(questionProperties.toObject() as unknown as JotFormQuestionData);
              }}
            />
            <Button
              content={secondaryButtonTitle}
              onClick={onClickSecondary}
              disabled={secondaryButtonDisabled}
            />
          </Flex>
          {isFormValid ? null : (
            <Text content="There are issues in your question properties." error />
          )}
        </Flex>
      </Form>
    </Flex>
  );
}

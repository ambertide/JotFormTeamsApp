import {
  Segment,
  List,
  Flex,
  MenuIcon,
  FormatIcon,
  Button,
  Avatar,
  TrashCanIcon,
  Input,
  CheckmarkCircleIcon,
  RadioButtonIcon,
} from "@fluentui/react-northstar";
import { JotFormData, JotFormQuestionData, StringAsNumber } from "interfaces/JotFormData";
import { useState, useEffect } from "react";
import I from "immutable";
import ListItem from "interfaces/ListItem";
import QuestionBuilder from "./QuestionBuilder";

interface FormBuilderProps {
  isLite: boolean;
  onSaveForm: (formData: JotFormData) => void;
  /**
   * Text on the button in top right.
   */
  buttonContent: string;
  /**
   * Action taken upon clicking the button in top right.
   */
  buttonOnClick: () => void;
}

function getQuestionIcon(questionType: string) {
  switch (questionType) {
    case "control_fullname":
      return <MenuIcon />;
    case "control_textbox":
      return <FormatIcon />;
    case "control_radio":
      return <RadioButtonIcon />;
    case "control_checkbox":
      return <CheckmarkCircleIcon />;
  }
}

/**
 * Convert a list of questions to a Map of questions, whose
 * keys are the indices of the questions in the array and
 * whose values are the questions themselves.
 */
function convertQuestions(
  questions: I.List<JotFormQuestionData>
): I.Map<StringAsNumber, JotFormQuestionData> {
  return questions.reduce(
    (reducer, value, key) => reducer.set(`${key}`, value),
    I.Map<StringAsNumber, JotFormQuestionData>()
  );
}

export default function FormBuilder(props: FormBuilderProps) {
  const { onSaveForm, isLite, buttonOnClick, buttonContent } = props;
  const [formTitle, setFormTitle] = useState<string>("My Form");
  const [questions, setQuestions] = useState(I.List<JotFormQuestionData>());
  const [listItems, setListItems] = useState(I.List<ListItem | JSX.Element>());
  useEffect(() => {
    setListItems(
      questions.map((question, index) => {
        return {
          key: `question${index}`,
          header: question.text,
          headerMedia: isLite ? (
            <Button
              content="Remove Question"
              onClick={() => {
                setQuestions((previousQuestions) => previousQuestions.remove(index));
              }}
            />
          ) : (
            <Button
              icon={<TrashCanIcon />}
              iconOnly
              title="Remove Question"
              onClick={() => {
                setQuestions((previousQuestions) => previousQuestions.remove(index));
              }}
            />
          ),
          media: <Avatar icon={getQuestionIcon(question.type)} square />,
        };
      })
    );
  }, [questions, setListItems]);
  return (
    <Segment
      styles={{
        width: "60%",
        maxHeight: "600px",
        overflowY: "auto",
      }}
      className={isLite ? "lite" : ""}
    >
      <Flex column gap="gap.smaller">
        <Flex styles={{ width: "100%" }}>
          <Input
            styles={{ marginLeft: "20px" }}
            id="FormTitle"
            value={formTitle}
            onChange={(event, data) => {
              setFormTitle(data?.value || "");
            }}
          />
          <Button content={buttonContent} onClick={buttonOnClick} styles={{ marginLeft: "auto" }} />
        </Flex>
        <List
          items={listItems
            .push(
              <QuestionBuilder
                onSaveQuestion={(question) => {
                  console.log(question);
                  setQuestions((previousQuestions) => previousQuestions.push(question));
                }}
                secondaryButtonTitle="Save Form"
                onClickSecondary={() => {
                  onSaveForm({
                    properties: { title: formTitle },
                    questions: convertQuestions(questions),
                  });
                }}
                isLite={isLite}
              />
            )
            .toArray()}
        />
      </Flex>
    </Segment>
  );
}

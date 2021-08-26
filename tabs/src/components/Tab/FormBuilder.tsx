import {
  Segment,
  List,
  Flex,
  MenuIcon,
  FormatIcon,
  Button,
  Avatar,
  Divider,
  Input,
  CheckmarkCircleIcon,
  RadioButtonIcon,
} from "@fluentui/react-northstar";
import { JotFormData, JotFormQuestionData, StringAsNumber } from "interfaces/JotFormTypes";
import { useState, useEffect } from "react";
import I from "immutable";
import ListItem from "interfaces/ListItem";
import QuestionBuilder from "./QuestionBuilder";

interface FormBuilderProps {
  /**
   * Determines whether or not the element is in light mode.
   */
  isLite: boolean;
  /**
   * Callback to be called upon saving the form.
   */
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
  // Represents the question currently selected, -1 for new question.
  const [selectedQuestion, setSelectedQuestion] = useState(-1);
  useEffect(() => {
    setListItems(
      questions.map((question, index) => {
        return {
          key: `question${index}`,
          header: question.text,
          onClick: () => {
            setSelectedQuestion(index);
          },
          media: <Avatar icon={getQuestionIcon(question.type)} square />,
        };
      })
    );
  }, [questions, setListItems, isLite]);
  return (
    <Segment
      styles={{
        height: "90%",
        minWidth: "90%",
        overflowY: "auto",
      }}
      className={"formBuilder" + isLite ? " lite" : ""}
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
          items={
            selectedQuestion === -1 // If currently no question is selected, put the Question builder to the last.
              ? listItems // And configure it to create a new question.
                  .push(
                    <Divider />,
                    <QuestionBuilder
                      onSaveQuestion={(question) => {
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
                  .toArray()
              : listItems
                  .remove(selectedQuestion)
                  .insert(selectedQuestion, <Divider />)
                  .insert(
                    selectedQuestion,
                    <QuestionBuilder
                      initialState={questions.get(selectedQuestion)}
                      isLite={isLite}
                      secondaryButtonTitle="Delete Question"
                      onClickSecondary={() => {
                        setQuestions((previousQuestions) =>
                          previousQuestions.remove(selectedQuestion)
                        ); // Delete the question.
                        setSelectedQuestion(-1); // Unselect it.
                      }}
                      onSaveQuestion={(question) => {
                        setQuestions((previousQuestions) =>
                          previousQuestions.set(selectedQuestion, question)
                        );
                        setSelectedQuestion(-1);
                      }}
                      buttonTitle="Modify Question"
                    />
                  )
                  .insert(selectedQuestion, <Divider />)
                  .toArray()
          }
        />
      </Flex>
    </Segment>
  );
}

import I from "immutable";
import { PollRestricted, QuestionResponse, SubmissionFieldAnswer } from "interfaces/JotFormTypes";
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Button, Flex, Form, Segment, Text } from "@fluentui/react-northstar";
import { useMemo } from "react";
import * as fields from "./Fields";

interface PollProps {
  /**
   * Questions expected of the user to answer.
   */
  questions: I.List<QuestionResponse>;
  /**
   * Callback function to submit survey result.
   */
  onSubmit: (data: I.Map<string, string | SubmissionFieldAnswer>) => void;
}

const GenerateQuestionField = (
  question: PollRestricted, // Use to set answer.
  answers: MutableRefObject<I.Map<string, string | SubmissionFieldAnswer>>, // This is the one with the answers.
  setInvalidFields: Dispatch<SetStateAction<I.List<string>>>
) => {
  const qid = question.qid;
  const onChangeCallback = (value: string | SubmissionFieldAnswer) => {
    answers.current = answers.current.set(qid, value);
  };
  const fieldsMap = I.Map(fields);
  const ReactElement = fieldsMap.get(question.type.split("_", 2)[1], null);
  if (ReactElement) {
    return (
      <ReactElement // @ts-ignore: Unreachable code error
        question={question}
        onChangeCallback={onChangeCallback}
        setInvalidFields={setInvalidFields}
      />
    );
  }
};

/**
 * Used by users to answer generated forms. Opened in a task module
 * which is like a modal.
 */
export default function Poll(props: PollProps) {
  const { questions, onSubmit } = props;
  const answers = useRef(I.Map<string, string | SubmissionFieldAnswer>()); // qid => answer.
  const [invalidFields, setInvalidFields] = useState(I.List<string>()); // List of inputs whose validation faild by their question ids.
  const questionFields = useMemo(
    () =>
      questions
        ?.map((question) =>
          GenerateQuestionField(question as PollRestricted, answers, setInvalidFields)
        )
        .toArray(),
    [questions, answers]
  );
  return (
    <Segment>
      <Form>
        {questionFields}
        <Flex column>
          <Button
            id="button"
            content="Submit"
            disabled={!invalidFields.isEmpty()} // Can't click the button if there are invalid fields
            onClick={() => {
              onSubmit(answers.current);
            }}
          />
          {invalidFields.isEmpty() ? null : (
            <Text content="There are problems in your submission, fix them to submit it." error />
          )}
        </Flex>
      </Form>
    </Segment>
  );
}

import I from "immutable";
import { PollRestricted, QuestionResponse, SubmissionFieldAnswer } from "interfaces/JotFormTypes";
import { MutableRefObject, useMemo, useRef, useState } from "react";
import { Button, Flex, Form, Segment, Text } from "@fluentui/react-northstar";
import * as fields from "./Fields";
import useFormValidation from "hooks/useFormValidation";
import { FormValidityContext } from "utils/FormValidityContext";
import withRequiredValidation from "utils/HOCs/withRequiredValidation";

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
  answers: MutableRefObject<I.Map<string, string | SubmissionFieldAnswer>> // This is the one with the answers.
) => {
  const qid = question.qid;
  const onChangeCallback = (value: string | SubmissionFieldAnswer) => {
    answers.current = answers.current.set(qid, value);
  };
  const fieldsMap = I.Map(fields);
  const ReactElement = fieldsMap.get(question.type.split("_", 2)[1], null);
  if (ReactElement) {
    const ElementWithValidation =
      question.type !== "control_textbox"
        ? withRequiredValidation(ReactElement as any, question.required === "Yes")
        : ReactElement; // Control_textbox has its own control.
    return (
      <ElementWithValidation
        key={question.qid} // @ts-ignore: Unreachable code error
        question={question}
        onChangeCallback={onChangeCallback}
      />
    );
  }
};

function PollInner(props: PollProps) {
  const { questions, onSubmit } = props;
  const { isFormValid } = useFormValidation();
  const answers = useRef(I.Map<string, string | SubmissionFieldAnswer>()); // qid => answer.
  const questionFields = useMemo(
    () =>
      questions
        ?.map((question) => GenerateQuestionField(question as PollRestricted, answers))
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
            disabled={!isFormValid} // Can't click the button if there are invalid fields
            onClick={() => {
              onSubmit(answers.current);
            }}
          />
          {isFormValid ? null : (
            <Text content="There are problems in your submission, fix them to submit it." error />
          )}
        </Flex>
      </Form>
    </Segment>
  );
}

/**
 * Used by users to answer generated forms. Opened in a task module
 * which is like a modal.
 */
export default function Poll(props: PollProps) {
  const [invalidFields, setInvalidFields] = useState(I.Set<string>());
  return (
    <FormValidityContext.Provider value={[invalidFields, setInvalidFields]}>
      <PollInner {...props} />
    </FormValidityContext.Provider>
  );
}

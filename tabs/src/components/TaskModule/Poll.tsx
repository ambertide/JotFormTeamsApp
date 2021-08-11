import { JotFormQuestionData } from "interfaces/JotFormData";
import I from "immutable";
import { PollRestricted, QuestionResponse } from "interfaces/JotFormApiResponses";
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import {
  Button,
  Form,
  FormFieldCustom,
  FormInput,
  FormLabel,
  Segment,
} from "@fluentui/react-northstar";
import CheckboxGroup from "components/Extensions/CheckboxGroup";
import RadioGroupCustom from "components/Extensions/RadioGroupCustom";
import { deconstructSpecial } from "utils/JFUtils";
import { SubmissionFieldAnswer } from "interfaces/JotFormApiRequests";
import { useCallback } from "react";
import { useMemo } from "react";
import FullNameInputGroup from "components/Extensions/FullNameInputGroup";
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
  answers: MutableRefObject<I.Map<string, string | SubmissionFieldAnswer>> // This is the one with the answers.
) => {
  const qid = question.qid;
  const onChangeCallback = (value: string | SubmissionFieldAnswer) => {
    answers.current = answers.current.set(qid, value);
  };
  const fieldsMap = I.Map(fields);
  const ReactElement = fieldsMap.get(question.type.split("_", 2)[1], null);
  if (ReactElement) {
    // @ts-ignore: Unreachable code error
    return <ReactElement question={question} onChangeCallback={onChangeCallback} />;
  }
};

export default function Poll(props: PollProps) {
  const { questions, onSubmit } = props;
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
        <Button
          id="button"
          content="Submit"
          onClick={() => {
            onSubmit(answers.current);
          }}
        />
      </Form>
    </Segment>
  );
}

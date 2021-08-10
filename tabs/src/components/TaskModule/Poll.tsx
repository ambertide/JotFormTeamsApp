import { JotFormQuestionData } from "interfaces/JotFormData";
import I from "immutable";
import { PollRestricted, QuestionResponse } from "interfaces/JotFormApiResponses";
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import {
  Button,
  Flex,
  Form,
  FormCheckbox,
  FormDropdown,
  FormFieldCustom,
  FormInput,
  FormLabel,
  FormRadioGroup,
  Input,
  Segment,
} from "@fluentui/react-northstar";
import CheckboxGroup from "components/Extensions/CheckboxGroup";
import RadioGroupCustom from "components/Extensions/RadioGroupCustom";
import { deconstructSpecial } from "utils/JFUtils";
import { SubmissionFieldAnswer } from "interfaces/JotFormApiRequests";
import { useCallback } from "react";
import { useMemo } from "react";
import FullNameInputGroup from "components/Extensions/FullNameInputGroup";

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

const generateQuestionField = (
  question: PollRestricted, // Use to set answer.
  answers: MutableRefObject<I.Map<string, string | SubmissionFieldAnswer>> // This is the one with the answers.
) => {
  const qid = question.qid;
  const onChangeCallback = (value: string | SubmissionFieldAnswer) => {
    answers.current = answers.current.set(qid, value);
  };
  switch (question.type) {
    case "control_textbox":
      return (
        <FormInput
          id={question.qid}
          key={question.qid}
          label={question.text}
          required={question.required === "Yes"}
          onChange={(event, data) => onChangeCallback(data?.value || "")}
        />
      );
    case "control_fullname":
      return (
        <FormFieldCustom id={question.qid} key={question.qid}>
          <FormLabel content={question.text} />
          <FullNameInputGroup
            showMiddleName={question.middle === "Yes"}
            showPrefix={question.prefix === "Yes"}
            showSuffix={question.suffix === "Yes"}
            onChange={onChangeCallback}
          />
        </FormFieldCustom>
      );
    case "control_radio":
      deconstructSpecial(question);
      const items: any[] = question.options.split("|");
      return (
        <RadioGroupCustom
          options={items}
          questionText={question.text}
          qid={question.qid}
          onChangeCallback={onChangeCallback}
          allowOther={question.allowOther === "Yes"}
          otherText={question.otherText}
        />
      );
    case "control_checkbox":
      deconstructSpecial(question);
      const checkboxItems = question.options.split("|").map((item: string) => {
        const shortName = item.split(" ")[0];
        return {
          keyID: shortName,
          text: item,
        };
      });
      return (
        <FormFieldCustom id={question.qid} key={question.qid}>
          <FormLabel content={question.text} />
          <CheckboxGroup
            items={I.List(checkboxItems)}
            onChange={(value) => onChangeCallback(value)}
            allowOther={question.allowOther === "Yes"}
            otherText={question.otherText}
          />
        </FormFieldCustom>
      );
  }
};

export default function Poll(props: PollProps) {
  const { questions, onSubmit } = props;
  const answers = useRef(I.Map<string, string | SubmissionFieldAnswer>()); // qid => answer.
  const questionFields = useMemo(
    () =>
      questions
        ?.map((question) => generateQuestionField(question as PollRestricted, answers))
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

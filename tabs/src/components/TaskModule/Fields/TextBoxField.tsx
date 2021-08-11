import { FormInput } from "@fluentui/react-northstar";
import { TextBoxQuestionResponse } from "interfaces/JotFormTypes";
import React from "react";

interface Props {
  question: TextBoxQuestionResponse;
  onChangeCallback: (value: string) => void;
}

function TextBoxField({ question, onChangeCallback }: Props) {
  return (
    <FormInput
      id={question.qid}
      label={question.text}
      required={question.required === "Yes"}
      onChange={(event, data) => onChangeCallback(data?.value || "")}
    />
  );
}

const MemoizedTextBoxField = React.memo(TextBoxField);

export { MemoizedTextBoxField };

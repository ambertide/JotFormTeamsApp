import { FormInput } from "@fluentui/react-northstar";
import { TextBoxQuestionResponse } from "interfaces/JotFormApiResponses";
import * as React from "react";

interface Props {
  question: TextBoxQuestionResponse;
  onChangeCallback: (value: string) => void;
}

export function TextBoxField({ question, onChangeCallback }: Props) {
  return (
    <FormInput
      id={question.qid}
      label={question.text}
      required={question.required === "Yes"}
      onChange={(event, data) => onChangeCallback(data?.value || "")}
    />
  );
}

//export default React.memo(TextBoxField);

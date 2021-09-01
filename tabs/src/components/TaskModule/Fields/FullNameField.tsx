import { FormFieldCustom, FormLabel } from "@fluentui/react-northstar";
import FullNameInputGroup from "components/Extensions/FullNameInputGroup";
import { FullNameAnswer, FullNameQuestionResponse } from "interfaces/JotFormTypes";
import React from "react";

export interface Props {
  question: FullNameQuestionResponse;
  onChangeCallback: (value: FullNameAnswer) => void;
}

function FullNameField({ question, onChangeCallback }: Props) {
  return (
    <FormFieldCustom id={question.qid}>
      <FormLabel content={question.text} />
      <FullNameInputGroup
        showMiddleName={question.middle === "Yes"}
        showPrefix={question.prefix === "Yes"}
        showSuffix={question.suffix === "Yes"}
        onChange={onChangeCallback}
      />
    </FormFieldCustom>
  );
}

const MemoizedFullNameField = React.memo(FullNameField);

export { MemoizedFullNameField };

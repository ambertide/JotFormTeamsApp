import { FormFieldCustom, FormLabel } from "@fluentui/react-northstar";
import FullNameInputGroup from "components/Extensions/FullNameInputGroup";
import { FullNameAnswer } from "interfaces/JotFormApiRequests";
import { FullNameQuestionResponse } from "interfaces/JotFormApiResponses";
import React from "react";

interface Props {
  question: FullNameQuestionResponse;
  onChangeCallback: (value: FullNameAnswer) => void;
}

export function FullNameField({ question, onChangeCallback }: Props) {
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

//export default React.memo(FullNameField);

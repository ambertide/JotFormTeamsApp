import { SelectQuestionResponse } from "interfaces/JotFormTypes";
import I from "immutable";
import { deconstructSpecial } from "utils/JFUtils";
import CheckboxGroup from "components/Extensions/CheckboxGroup";
import { FormFieldCustom, FormLabel } from "@fluentui/react-northstar";
import React from "react";

export interface Props {
  question: SelectQuestionResponse;
  onChangeCallback: (value: I.List<string>) => void;
}

function CheckboxField({ question, onChangeCallback }: Props) {
  deconstructSpecial(question);
  const checkboxItems = question.options.split("|").map((item: string) => {
    const shortName = item.split(" ")[0];
    return {
      keyID: shortName,
      text: item,
    };
  });
  return (
    <FormFieldCustom id={question.qid}>
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

const MemoizedCheckboxField = React.memo(CheckboxField);

export { MemoizedCheckboxField };

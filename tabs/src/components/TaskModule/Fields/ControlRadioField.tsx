import RadioGroupCustom from "components/Extensions/RadioGroupCustom";
import { SelectQuestionResponse } from "interfaces/JotFormApiResponses";
import * as React from "react";
import { deconstructSpecial } from "utils/JFUtils";

interface Props {
  question: SelectQuestionResponse;
  onChangeCallback: (value: string) => void;
}

export function ControlRadioField({ question, onChangeCallback }: Props) {
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
}

//export default React.memo(ControlRadioField);

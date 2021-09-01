import RadioGroupCustom from "components/Extensions/RadioGroupCustom";
import { SelectQuestionResponse } from "interfaces/JotFormTypes";
import * as React from "react";
import { deconstructSpecial } from "utils/JFUtils";

export interface Props {
  question: SelectQuestionResponse;
  onChangeCallback: (value: string) => void;
}

function ControlRadioField({ question, onChangeCallback }: Props) {
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

const MemoizedControlRadioField = React.memo(ControlRadioField);

export { MemoizedControlRadioField };

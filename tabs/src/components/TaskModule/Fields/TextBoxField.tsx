import { FormFieldCustom } from "@fluentui/react-northstar";
import { SelfValidatingInput } from "components/Extensions";
import { TextBoxQuestionResponse } from "interfaces/JotFormTypes";
import { SetStateAction } from "react";
import { useEffect } from "react";
import { Dispatch } from "react";
import { useState } from "react";
import I from "immutable";

interface Props {
  question: TextBoxQuestionResponse;
  onChangeCallback: (value: string) => void;
  setInvalidFields: Dispatch<SetStateAction<I.List<string>>>;
}

function TextBoxField({ question, onChangeCallback, setInvalidFields }: Props) {
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    if (isValid) {
      // If the input have switched to being valid.
      setInvalidFields((previousInvalidFields) => {
        const index = previousInvalidFields.findIndex((qid) => qid === question.qid);
        if (index !== -1) {
          // We look for its index in the invalid inputs list.
          return previousInvalidFields.remove(index); // And remove it.
        }
        return previousInvalidFields; // Otherwise just return the list.
      });
    } else {
      // Alternatively, our input state might not be valid.
      // In which case it is enough to simply set it as an invalid field.
      setInvalidFields((previousInvalidFields) => previousInvalidFields.push(question.qid));
    }
  }, [isValid, setInvalidFields, question.qid]);
  return (
    <FormFieldCustom id={question.qid} required>
      <SelfValidatingInput
        label={question.text}
        validationType={question.validation}
        setValidateState={setIsValid}
        required={question.required === "Yes"}
        onInputChange={(value) => onChangeCallback(value)}
      />
    </FormFieldCustom>
  );
}

export { TextBoxField };

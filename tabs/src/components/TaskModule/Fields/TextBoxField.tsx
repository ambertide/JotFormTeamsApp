import { FormFieldCustom } from "@fluentui/react-northstar";
import { SelfValidatingInput } from "components/Extensions";
import { TextBoxQuestionResponse } from "interfaces/JotFormTypes";
import useFormValidation from "hooks/useFormValidation";

interface Props {
  question: TextBoxQuestionResponse;
  onChangeCallback: (value: string) => void;
}

function TextBoxField({ question, onChangeCallback }: Props) {
  const { setFieldValidity } = useFormValidation();
  return (
    <FormFieldCustom id={question.qid} required>
      <SelfValidatingInput
        label={question.text}
        validationType={question.validation}
        setValidateState={(isValid) => setFieldValidity(question.qid, isValid)}
        required={question.required === "Yes"}
        onInputChange={(value) => onChangeCallback(value)}
      />
    </FormFieldCustom>
  );
}

export { TextBoxField };

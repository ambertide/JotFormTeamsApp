import { FormDropdown } from "@fluentui/react-northstar";
import { SelfValidatingInput } from "components/Extensions";
import { TextBoxQuestion } from "interfaces/JotFormTypes";
import QuestionFragmentProps from "interfaces/QuestionFragmentProps";
import { useState } from "react";
const TextBookItemTypes = ["None", "Email", "AlphaNumeric", "Alphabetic", "Numeric", "URL"];

interface TextBoxFragmentProps extends QuestionFragmentProps {
  /**
   * Initial state of the question fields.
   */
  initialState?: TextBoxQuestion;
  /**
   * Callback to set the validity of the fields this component.
   */
  setValidity: (fieldID: string, isValid: boolean) => void;
}

/**
 * Used to build a question of type
 * control_fullname.
 */
export default function TextBoxFragment({
  addPropertyToQuestion,
  initialState,
  setValidity,
}: TextBoxFragmentProps) {
  const [validation, setValidation] = useState(initialState?.validation || "None");
  return (
    <>
      <FormDropdown
        items={TextBookItemTypes}
        value={validation}
        onChange={(event, data) => {
          const value = (data.value || "None") as string;
          addPropertyToQuestion("validation", value);
          setValidation(value as any);
        }}
        label="Text entry is limited to"
        checkable
        getA11ySelectionMessage={{ onAdd: (item) => `${item} has been selected.` }}
      />
      <SelfValidatingInput
        label="Text area size"
        required
        validationType="Numeric"
        defaultValue={initialState?.maxsize}
        setValidateState={(isValid) => setValidity("maxsize-input", isValid)}
        onInputChange={(value) => {
          addPropertyToQuestion("maxsize", value);
        }}
      />
    </>
  );
}

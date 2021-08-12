import { Input, FormDropdown } from "@fluentui/react-northstar";
import { TextBoxQuestion } from "interfaces/JotFormTypes";
import QuestionFragmentProps from "interfaces/QuestionFragmentProps";
import { useState } from "react";
const TextBookItemTypes = ["None", "Email", "AlphaNumeric", "Alphabetic", "Numeric", "URL"];

interface TextBoxFragmentProps extends QuestionFragmentProps {
  initialState?: TextBoxQuestion;
}

/**
 * Used to build a question of type
 * control_fullname.
 */
export default function TextBoxFragment(props: TextBoxFragmentProps) {
  const { addPropertyToQuestion, initialState } = props;
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
      <Input
        label="Text area size"
        required
        inputMode="numeric"
        defaultValue={initialState?.maxsize}
        onChange={(event, data) => {
          addPropertyToQuestion("maxsize", data?.value || "60");
        }}
      />
    </>
  );
}

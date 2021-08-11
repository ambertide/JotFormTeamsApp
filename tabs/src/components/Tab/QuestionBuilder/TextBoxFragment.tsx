import { Input, FormDropdown } from "@fluentui/react-northstar";
import QuestionFragmentProps from "interfaces/QuestionFragmentProps";
import { useState } from "react";
const TextBookItemTypes = ["None", "Email", "AlphaNumeric", "Alphabetic", "Numeric", "URL"];
/**
 * Used to build a question of type
 * control_fullname.
 */
export default function TextBoxFragment(props: QuestionFragmentProps) {
  const { addPropertyToQuestion } = props;
  const [validation, setValidation] = useState("None");
  return (
    <>
      <FormDropdown
        items={TextBookItemTypes}
        defaultActiveSelectedIndex={0}
        value={validation}
        onChange={(event, data) => {
          const value = (data.value || "None") as string;
          addPropertyToQuestion("validation", value);
          setValidation(value);
        }}
        label="Text entry is limited to"
        checkable
        getA11ySelectionMessage={{ onAdd: (item) => `${item} has been selected.` }}
      />
      <Input
        label="Text area size"
        required
        inputMode="numeric"
        onChange={(event, data) => {
          addPropertyToQuestion("maxsize", data?.value || "60");
        }}
      />
    </>
  );
}

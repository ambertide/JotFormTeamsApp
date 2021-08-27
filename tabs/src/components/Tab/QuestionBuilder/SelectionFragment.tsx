import { FormCheckbox, FormDropdown, FormInput } from "@fluentui/react-northstar";
import QuestionFragmentProps from "interfaces/QuestionFragmentProps";
import { useState } from "react";
import I from "immutable";
import { CheckboxQuestion, RadioQuestion } from "interfaces/JotFormTypes";
import { useEffect } from "react";
import ChoiceAdder from "./ChoiceAdder";

type RadioQKeys = keyof RadioQuestion;
type RadioQValues = RadioQuestion[RadioQKeys];

interface SelectionFragmentProps extends QuestionFragmentProps {
  initialState?: CheckboxQuestion | RadioQuestion;
}

/**
 * Used to build a question of type
 * control_fullname.
 */
export default function SelectionFragment(props: SelectionFragmentProps) {
  const { addPropertyToQuestion, initialState } = props;
  const [radioProperties, setRadioProperties] = useState(
    I.Map<RadioQKeys, RadioQValues>({
      allowOther: initialState?.allowOther || "No",
      special: initialState?.special || "None",
    })
  );
  useEffect(() => {
    radioProperties.forEach((value, key) => {
      if (value !== undefined) {
        addPropertyToQuestion(key, value);
      }
    });
  }, [radioProperties, addPropertyToQuestion]);
  return (
    <>
      <FormCheckbox
        label="Allow Others"
        checked={radioProperties.get("allowOther") === "Yes"}
        onChange={(event, data) => {
          setRadioProperties((previousProperties) =>
            previousProperties.set("allowOther", data?.checked ? "Yes" : "No")
          );
        }}
        toggle
      />
      <FormInput
        label="Other Text"
        fluid
        defaultValue={initialState?.otherText}
        disabled={radioProperties.get("allowOther") === "No"}
        onChange={(event, data) => {
          setRadioProperties((previousProperties) =>
            previousProperties.set("otherText", data?.value || "")
          );
        }}
      />
      <FormDropdown
        label="Select Preset"
        value={radioProperties.get("special")}
        items={["None", "Gender", "Days", "Months"]}
        checkable
        onChange={(event, data) => {
          setRadioProperties((previousProperties) =>
            previousProperties.set("special", data.value?.toString() || "None")
          );
        }}
      />
      <ChoiceAdder
        setQuestionProperty={setRadioProperties}
        initialChoices={I.List(initialState?.options?.split("|") || [])}
      />
    </>
  );
}

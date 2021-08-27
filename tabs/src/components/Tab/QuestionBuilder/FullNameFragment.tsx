import { CheckboxGroup } from "components/Extensions";
import QuestionFragmentProps from "interfaces/QuestionFragmentProps";
import I from "immutable";
import { FullNameQuestion } from "interfaces/JotFormTypes";

const nameTextKeys = I.Map({
  "Middle Name": "middle",
  Prefix: "prefix",
  Suffix: "suffix",
});

const items = nameTextKeys.reduce(
  (reduction, value, key) =>
    reduction.push({
      keyID: value,
      text: key,
    }),
  I.List<{ keyID: string; text: string }>()
);

const keys = nameTextKeys.valueSeq();

interface FullNameFragmentProps extends QuestionFragmentProps {
  initialState?: FullNameQuestion;
}

/**
 * Used to build a question of type
 * control_fullname.
 */
export default function FullNameFragment({
  addPropertyToQuestion,
  initialState,
}: FullNameFragmentProps) {
  return (
    <>
      <CheckboxGroup
        items={items}
        areToggles
        itemsPreset={I.List([initialState?.middle, initialState?.prefix, initialState?.suffix]).map(
          (value) => value === "Yes" // Convert JFBoolean to boolean, by default these won't be selected.
        )}
        onChange={(values) => {
          const postiveValues = values.map((value) => nameTextKeys.get(value));
          keys.forEach((key) => {
            if (postiveValues.find((e) => e === key)) {
              // If a key appears in positive values
              addPropertyToQuestion(key, "Yes"); // Set it to be asked in the full name.
            } else {
              addPropertyToQuestion(key, "No"); // Otherwise make it so that it won't.
            }
            // These are set explicitly because omitting them creates problems when we uncheck a key.
          });
        }}
      />
    </>
  );
}

import I from "immutable";
import { Dispatch, useState } from "react";
import { Checkbox, Flex, Input } from "@fluentui/react-northstar";
import { useEffect } from "react";
import { useRef } from "react";
import { SetStateAction } from "react";

type ItemType = {
  keyID: string;
  text: string;
};

interface CheckboxGroupProps {
  /**
   * List of items.
   */
  items: I.List<ItemType>;
  /**
   * Callback to be called when a checkbox is checked.
   */
  onChange: (value: I.List<string>) => void;
  /**
   * If the other option is available.
   */
  allowOther?: boolean;
  /**
   * Text to be shown in the other field.
   */
  otherText?: string;
  /**
   * A parallel list to the items list that indicate whether or not
   * a specific item is checked.
   */
  itemsPreset?: I.List<boolean>;
}

function CheckboxGroupOther(props: {
  otherText: string;
  setEffectiveOtherText: Dispatch<SetStateAction<string>>;
}) {
  const { otherText, setEffectiveOtherText } = props;
  const [text, setText] = useState(otherText);
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (isSelected) {
      setEffectiveOtherText(text);
    } else {
      setEffectiveOtherText("");
    }
  }, [text, isSelected, setEffectiveOtherText]);
  return (
    <Flex>
      <Checkbox
        checked={isSelected}
        onChange={(data, event) => setIsSelected((prevSelected) => !prevSelected)}
      />
      <Input
        value={text}
        onChange={(event, data) => setText(data?.value || "")}
        disabled={!isSelected}
      />
    </Flex>
  );
}

export default function CheckboxGroup(props: CheckboxGroupProps) {
  const { items, onChange, allowOther, itemsPreset, otherText = "Other" } = props;
  const [effectiveOtherText, setEffectiveOtherText] = useState(""); // Effect of the other text to selected.
  const itemKeyToLabel = useRef(
    items.reduce((reducer, value) => reducer.set(value.keyID, value.text), I.Map<string, string>())
  );
  const [selections, setSelections] = useState(
    items.reduce(
      (reduction, value, key) => reduction.set(value.keyID, itemsPreset?.get(key, false) || false),
      I.Map<string, boolean>({})
    )
  ); // qid => answer.
  useEffect(() => {
    let selectionTexts = selections
      .keySeq()
      .filter((key) => selections.get(key))
      .map((key) => itemKeyToLabel.current.get(key))
      .toList();
    if (effectiveOtherText !== "") {
      selectionTexts = selectionTexts.push(effectiveOtherText);
    }
    onChange(selectionTexts as I.List<string>); // There is a semantic guarantee that the keys are always defined.
  }, [selections, effectiveOtherText, onChange]);
  return (
    <>
      {items.map((item) => (
        <Checkbox
          key={item.keyID}
          label={item.text}
          checked={selections.get(item.keyID)}
          onChange={(event, data) => {
            setSelections((previousSelections) =>
              previousSelections.set(item.keyID, !previousSelections.get(item.keyID))
            );
          }}
        />
      ))}
      {allowOther ? (
        <CheckboxGroupOther otherText={otherText} setEffectiveOtherText={setEffectiveOtherText} />
      ) : null}
    </>
  );
}

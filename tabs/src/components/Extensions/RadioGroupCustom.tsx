import { Flex, FormRadioGroup, Input, RadioGroup } from "@fluentui/react-northstar";
import { useEffect, useState } from "react";

interface RadioGroupCustomProps {
  /**
   * Options to be shown in the radio buttons.
   */
  options: string[];
  /**
   * Callback to hoist the value to the wrapper component.
   */
  onChangeCallback: (value: string) => void;
  /**
   * Question ID.
   */
  qid: string;
  /**
   * Label of the question.
   */
  questionText: string;
  /**
   * If set to true, user can enter custom input.
   */
  allowOther?: boolean;
  /**
   * If allowOthers is set to true, other text is displayed
   * in the custom input field by default.
   */
  otherText?: string;
}

export default function RadioGroupCustom(props: RadioGroupCustomProps) {
  const { options, onChangeCallback, qid, questionText, allowOther, otherText = "Other" } = props;
  const [selectableItems, setSelectableItems] = useState<any[]>();
  const [checkedValue, setCheckedValue] = useState<string | number>();
  const [effectiveCustom, setEffectiveCustom] = useState("");
  useEffect(() => {
    if (checkedValue === "custom") {
      onChangeCallback(effectiveCustom);
    } else {
      onChangeCallback(checkedValue as string);
    }
  }, [effectiveCustom, checkedValue, onChangeCallback]);
  useEffect(() => {
    const items: any[] = options.map((item, index) => {
      const itemID = qid + item + index.toString();
      return {
        name: itemID,
        key: itemID,
        label: item,
        value: itemID,
      };
    });
    if (allowOther) {
      items.push({
        name: "custom",
        key: qid + "Custom",
        children: (Component: any, { key, ...props }: { key: any }) => {
          return (
            <Flex key={key} inline>
              <Component {...props} />
              <Input
                onFocus={() => setCheckedValue("custom")}
                input={{
                  tabIndex: checkedValue === "custom" ? "0" : "-1",
                }}
                inline
                onChange={(event, data) => {
                  setEffectiveCustom(data?.value || "");
                }}
                placeholder={otherText}
              />
            </Flex>
          );
        },
        value: "custom",
        "aria-label": "Enter a custom value by pressing tab.",
      });
    }
    setSelectableItems(items);
  }, [
    setSelectableItems,
    allowOther,
    otherText,
    setCheckedValue,
    checkedValue,
    options,
    setEffectiveCustom,
    qid,
  ]);
  return (
    <FormRadioGroup
      vertical
      id={qid}
      label={questionText}
      items={selectableItems}
      onCheckedValueChange={(e, data) =>
        setCheckedValue(data?.label || (selectableItems ? selectableItems[0] : ""))
      }
    />
  );
}

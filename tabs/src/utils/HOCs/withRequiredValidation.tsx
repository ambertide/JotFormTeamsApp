import { Flex, Text } from "@fluentui/react-northstar";
import { Props as CheckboxFieldProps } from "components/TaskModule/Fields/CheckboxField";
import { Props as RadioFieldProps } from "components/TaskModule/Fields/ControlRadioField";
import { Props as FullnameProps } from "components/TaskModule/Fields/FullNameField";
import useFormValidation from "hooks/useFormValidation";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { isFullNameFilled } from "utils/JFUtils";

type AcceptedProps = FullnameProps | CheckboxFieldProps | RadioFieldProps;

/**
 * Poll fields wrapped with this HOC will invalidate their
 * poll if they are left empty and a value is required.
 * @param Component Component to wrap, one of the fields except
 * textbox.
 * @param required Whether or not a value is required.
 * @returns A new component that interracts with validation.
 */
export default function withRequiredValidation(
  Component: (props: AcceptedProps) => JSX.Element,
  required: boolean
) {
  if (required) {
    const InnerComponent = ({ onChangeCallback, question }: AcceptedProps) => {
      const { setFieldValidity } = useFormValidation();
      const [validity, setValidity] = useState(false);
      const onChangeWithValidation = useCallback(
        (value) => {
          if (
            // It is valid if it is not
            value !== undefined && //  undefined
            value !== "" && // Is empty string
            (value.isEmpty === undefined || !value.isEmpty()) && // If List then empty
            (question.type !== "control_fullname" || isFullNameFilled(question, value))
          ) {
            setFieldValidity(question.qid, true);
            onChangeCallback(value);
            setValidity(true);
          } else {
            setFieldValidity(question.qid, false);
            setValidity(false);
          }
        },
        [setFieldValidity, question.qid, onChangeCallback]
      );
      useEffect(() => {
        if (required) {
          onChangeWithValidation(undefined);
        }
      }, []); // Call this at start to trigger invalid state.
      return (
        <Flex column>
          <Component
            onChangeCallback={onChangeWithValidation as any}
            question={
              {
                ...question,
                text: question.text + "*",
              } as any
            }
          />
          {validity ? null : <Text content="*This field is required." error />}
        </Flex>
      );
    };
    return InnerComponent;
  } else {
    return Component;
  }
}

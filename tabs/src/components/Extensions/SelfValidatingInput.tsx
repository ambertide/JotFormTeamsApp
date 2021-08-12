import { Input } from "@fluentui/react-northstar";
import { ValidationType } from "interfaces/ValidationTypes";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { validateString } from "utils/JFUtils";

interface SelfValidatingInputProps {
  /**
   * Type of validation the Self-Validating Input checks for.
   */
  validationType: ValidationType;
  /**
   * Callback to be performed when the input changes.
   */
  onInputChange?: (value: string) => void;
  /**
   * Callback function to run on validation to hoist validate state
   */
  setValidateState?: (validationState: boolean) => any;
  /**
   * Placeholder string that should be placed inside the input.
   */
  placeholder?: string;
  /**
   * Styles to be passed down to the component.
   */
  styles?: any;
  /**
   * Whether or not the elemnt should fill its container.
   */
  fluid?: boolean;
  /**
   * Value of the component.
   */
  value?: string;
  /**
   * Label on top of the component.
   */
  label?: any;
  /**
   * Whether or not the input is required.
   */
  required?: boolean;
}

/**
 * A special extension of the FluentUI (React-Northstar) Input component
 * that does not dispatch its onInputChange callback until its input is
 * validated according to given criteria.
 */
export default function SelfValidatingInput({
  validationType = "None",
  onInputChange,
  setValidateState,
  ...misc
}: SelfValidatingInputProps) {
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (setValidateState) {
      setValidateState(isValid);
    }
  }, [isValid, setValidateState]);
  const validateStringBeforePassing = useCallback(
    (validatee: string) => {
      const isStringValid = validateString(validatee, validationType);
      setIsValid(isStringValid);
      if (isStringValid && onInputChange) {
        onInputChange(validatee);
      }
    },
    [validationType, onInputChange, setIsValid]
  );
  return (
    <Input
      error={!isValid}
      onChange={(event, data) => validateStringBeforePassing(data?.value || "")}
      {...misc}
    />
  );
}

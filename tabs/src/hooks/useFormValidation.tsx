import { useContext } from "react";
import { useCallback, useMemo } from "react";
import { FormValidityContext } from "utils/FormValidityContext";
/**
 * A hook that can be used to interract with form validity.
 * @returns isFormValid and setFieldValidity, isFormValid can be used to
 *  check if the whole form is valid and setFieldValidity(Qid, isValid) can
 *  be used to set the validity of a field.
 */
export default function useFormValidation() {
  // List of the question IDs of invalid states.
  const [invalidFields, setInvalidFields] = useContext(FormValidityContext);
  // A callback function to set field validity.
  const setFieldValidity = useCallback(
    (fieldQid: string, isValid: boolean) => {
      if (isValid) {
        setInvalidFields((previousValidFields) => previousValidFields.delete(fieldQid));
      } else {
        setInvalidFields((previousValidFields) => previousValidFields.add(fieldQid));
      }
    },
    [setInvalidFields]
  );
  // If there are no invalid fields, the whole form is valid.
  const isFormValid = useMemo(() => invalidFields.isEmpty(), [invalidFields]);
  return { isFormValid, setFieldValidity };
}

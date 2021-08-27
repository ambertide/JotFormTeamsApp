import { useState, useMemo, useCallback } from "react";
import I from "immutable";
/**
 * A simpler variant of useFormValidation, does not need
 * a consumer-provider based approach.
 * @param overrideValidation: A callback function that if evaluates to true will immediately
 * set the isValid to true.
 * @return setFieldValidity: Used to set the validity of a singular field.
 * @return isFormValid: Used to determine the overall validity of the form.
 * @return resetValidityMap: Function that can be used to reset the validity map.
 */
export default function useTransientFormValidation(overrideValidation?: () => boolean) {
  const [fieldValidityMap, setFieldValidityMap] = useState<I.Map<string, boolean> | undefined>(
    undefined
  );
  const setFieldValidity = useCallback(
    (fieldID: string, isFieldValid: boolean) => {
      setFieldValidityMap((prevValidityMap) => {
        if (prevValidityMap === undefined) {
          // If the validity map is yet undefined
          return I.Map<string, boolean>().set(fieldID, isFieldValid); // Define it first.
        } else {
          // Otherwise simply set the value of the fieldID.
          return prevValidityMap.set(fieldID, isFieldValid);
        }
      });
    },
    [setFieldValidityMap]
  );
  const isFormValid = useMemo(
    () =>
      (overrideValidation !== undefined ? overrideValidation() : true) ||
      (fieldValidityMap !== undefined
        ? fieldValidityMap?.valueSeq().every((value) => value)
        : false),
    [fieldValidityMap, overrideValidation]
  );
  const resetValidityMap = useCallback(() => {
    setFieldValidityMap(I.Map<string, boolean>());
  }, [setFieldValidityMap]);
  return { setFieldValidity, isFormValid, resetValidityMap };
}

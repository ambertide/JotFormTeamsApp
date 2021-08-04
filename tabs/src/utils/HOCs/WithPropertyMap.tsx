import { ComponentType, Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import I from "immutable";

interface WithPropertyMapProps<T> {
  value?: T;
  onChange?: (event: any, data: any) => void;
}

/**
 * Take an existing form field and make it controlled and
 * add the addProperties calls.
 */
export default function WithPropertyMap<P extends WithPropertyMapProps<T>, T>(
  fieldName: string,
  addPropertyCallback: Dispatch<SetStateAction<I.Map<any, any>>>,
  fieldValueSelector: () => string,
  WrappedComponent: ComponentType<P>,
  valueConversion: (value: T) => string,
  reverseConversion: (value: string) => T
) {
  const addPropertyOnChange = (event: any, data: any) => {
    addPropertyCallback((previousProperties) =>
      previousProperties.set(fieldName, valueConversion(data.value))
    );
  };
  const InternalComponent = (props: P) => {
    return (
      <WrappedComponent
        {...props}
        value={reverseConversion(fieldValueSelector())}
        onChange={addPropertyOnChange}
      />
    );
  };
  return InternalComponent;
}

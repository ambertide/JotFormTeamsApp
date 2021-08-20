import { useCallback, useMemo, useState } from "react";
import I from "immutable";

/**
 * A hook that can be used to track the state of multiple,
 * elements in a map of element => boolean.
 */
export default function useTrackAll<T>(elements: T[], initialState: boolean) {
  const [elementStates, setElementState] = useState(
    elements.reduce((stateMap, element) => stateMap.set(element, initialState), I.Map<T, boolean>())
  );
  const setState = useCallback(
    (element: T, state: boolean) =>
      setElementState((prevElementStates) => prevElementStates.set(element, state)),
    [setElementState]
  );
  const isAll = useMemo(() => elementStates.valueSeq().every((isTrue) => isTrue), [elementStates]);
  return { isAll, setState };
}

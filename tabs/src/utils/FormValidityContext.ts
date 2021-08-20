import { createContext, Dispatch, SetStateAction } from "react";
import I from "immutable";

/**
 * Used to contain invalid form states.
 */
export const FormValidityContext = createContext<
  [I.Set<string>, Dispatch<SetStateAction<I.Set<string>>> | (() => void)]
>([I.Set<string>(), () => {}]); // eslint-disable-line

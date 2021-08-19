import { createContext, Dispatch, SetStateAction } from "react";
import I from "immutable";

export const FormValidityContext = createContext<
  [I.Set<string>, Dispatch<SetStateAction<I.Set<string>>> | (() => void)]
>([I.Set<string>(), () => {}]); // used to contain invalid states.

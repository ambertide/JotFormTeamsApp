export type ValidationType = "None" | "Email" | "AlphaNumeric" | "Alphabetic" | "Numeric" | "URL";
export type ValidatorFunction = (validatee: string) => boolean;
export type ValidatorStore = Record<ValidationType, ValidatorFunction>;

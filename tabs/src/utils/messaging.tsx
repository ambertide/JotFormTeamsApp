import { toast } from "react-toastify";

/** Inform user on an information */
export function showInfo(message: string) {
  toast(message, { type: "info" });
}

/** Inform the user of a successful operation. */
export function showSuccess(message: string) {
  toast(message, { type: "success" });
}

/** Inform the user of an error. */
export function showError(message: string) {
  toast(message, { type: "error" });
}

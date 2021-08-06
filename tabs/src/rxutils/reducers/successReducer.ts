/**
 * TODO: Convert this to a message reducer to pass messages to toasts.
 */
import { toast } from "react-toastify";
import { SuccessAction } from "../../interfaces/reduxActions";

export default function successReducer(state = false, action: SuccessAction) {
  switch (action.type) {
    case "SUCCESS":
      toast(action.message, { type: "success" });
      return state;
    default:
      return state;
  }
}

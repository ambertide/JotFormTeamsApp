import { errorAction } from "interfaces/reduxActions";
import { toast } from "react-toastify";

export default function errorReducer(state = "", action: errorAction) {
  switch (action.type) {
    case "CONN_ERR":
      toast("A connection error has occurred.", { type: "error" });
      return action.errorMessage;
    default:
      return state;
  }
}

import { errorAction } from "interfaces/reduxActions";

export default function errorReducer(state = "", action: errorAction) {
  switch (action.type) {
    case "CONN_ERR":
      return action.errorMessage;
    default:
      return state;
  }
}

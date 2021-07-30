import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formsReducer from "./formsReducer";
import errorReducer from "./errorReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  forms: formsReducer,
  error: errorReducer,
});

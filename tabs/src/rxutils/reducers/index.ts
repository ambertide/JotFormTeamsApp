import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formsReducer from "./formsReducer";
import errorReducer from "./errorReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import azureADReducer from "./azureADReducer";
import azureTeamsReducer from "./azureTeamsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  forms: formsReducer,
  error: errorReducer,
  azureToken: azureADReducer,
  teams: azureTeamsReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

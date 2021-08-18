import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formsReducer from "./formsReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import I from "immutable";
import azureTeamsReducer from "./azureTeamsReducer";
import { createTransform } from "redux-persist";
import User from "interfaces/User";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  forms: formsReducer,
  teams: azureTeamsReducer,
  themeName: themeReducer,
});

const ImmutableTransform = createTransform(
  (inboundState: User, key) => {
    return inboundState; // Already JSON compatible
  },
  (outboundState: User, key) => {
    return I.Map(outboundState); // Return to map.
  },
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "themeName"],
  transforms: [ImmutableTransform],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

import { combineReducers } from "redux";
import { userReducer } from "./Auth";
import { profileReducer } from "./Profile";
// import Alerts from "./Alerts";

export const rootReducer = combineReducers({
  //   Alerts,
  userReducer,
  profileReducer,
});

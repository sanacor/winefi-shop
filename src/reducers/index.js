import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import loginSlice from "../features/auth/loginSlice";

export default combineReducers({
  auth,
  message,
  loginSlice
});

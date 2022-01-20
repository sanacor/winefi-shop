//import rootReducer from "./reducers";
import message from "./reducers/message";
import loginSlice from "./features/auth/loginSlice";

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore(
  {
    reducer : {
      message,
      loginSlice
    }
  }
);

export default store;

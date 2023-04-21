import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import chatReducer from './chat-slice';
import groupReducer from './group-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    group: groupReducer,
  },
});

export default store;

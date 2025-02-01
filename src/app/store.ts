import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
export type AppDispatch = typeof store.dispatch;

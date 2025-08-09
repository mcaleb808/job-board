import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";

export const initStore = () => {
  return configureStore({
    reducer: { auth },
  });
}

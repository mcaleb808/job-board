import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import jobs from "../features/jobs/jobsSlice";
import applications from "../features/applications/applicationsSlice";

export const initStore = () => {
  return configureStore({
    reducer: { auth, jobs, applications },
  });
};

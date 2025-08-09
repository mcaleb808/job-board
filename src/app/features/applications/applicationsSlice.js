import { createSlice } from "@reduxjs/toolkit";

const initialState = { byId: {}, status: "idle", error: null };

const slice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    applicationSaved(state, action) {
      const app = action.payload;
      state.byId[app.id] = app;
    },
  },
});

export const { applicationSaved } = slice.actions;
export default slice.reducer;

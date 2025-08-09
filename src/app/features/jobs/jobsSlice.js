import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  page: 1,
  pageSize: 10,
  total: 0,
  filters: { q: "", type: "all" },
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setFilters, setPage } = slice.actions;
export default slice.reducer;

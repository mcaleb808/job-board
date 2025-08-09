import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (query) => {
  const u = new URL("/api/jobs", window.location.origin);
  Object.entries(query || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") u.searchParams.set(k, v);
  });
  const res = await fetch(u);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
});

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id) => {
    const res = await fetch(`/api/jobs/${id}`);
    if (!res.ok) throw new Error("Failed to fetch job");
    return res.json();
  }
);

const initialState = {
  items: [],
  page: 1,
  pageSize: 8,
  total: 0,
  filters: { q: "", type: "all" },
  status: "idle",
  error: null,
  selected: null,
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
    clearSelected(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchJobs.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload.items;
        s.total = a.payload.total;
        s.page = a.payload.page;
        s.pageSize = a.payload.pageSize;
      })
      .addCase(fetchJobs.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(fetchJobById.pending, (s) => {
        s.status = "loading";
        s.error = null;
        s.selected = null;
      })
      .addCase(fetchJobById.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.selected = a.payload;
      })
      .addCase(fetchJobById.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
        s.selected = null;
      });
  },
});

export const { setFilters, setPage, clearSelected } = slice.actions;
export default slice.reducer;

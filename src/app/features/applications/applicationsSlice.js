import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitApplication = createAsyncThunk(
  "apps/submit",
  async (payload) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error((await res.json()).message || "Submit failed");
    return res.json();
  }
);

export const fetchMyApplications = createAsyncThunk(
  "apps/fetchMine",
  async () => {
    const res = await fetch("/api/applications/me", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load applications");
    return res.json();
  }
);

const slice = createSlice({
  name: "applications",
  initialState: { byId: {}, mine: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(submitApplication.pending, (s) => {
      s.status = "loading";
      s.error = null;
    })
      .addCase(submitApplication.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.byId[a.payload.id] = a.payload;
        s.mine.unshift(a.payload);
      })
      .addCase(submitApplication.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(fetchMyApplications.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchMyApplications.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.mine = a.payload.items || [];
      })
      .addCase(fetchMyApplications.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      });
  },
});

export default slice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk("auth/login", async (payload) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || "Invalid credentials");
  return res.json();
});

export const authRegister = createAsyncThunk(
  "auth/register",
  async (payload) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok)
      throw new Error((await res.json()).message || "Registration failed");
    return res.json();
  }
);

export const authLogout = createAsyncThunk("auth/logout", async () => {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  if (!res.ok) throw new Error("Logout failed");
  return { ok: true };
});

const initialState = { user: null, status: "idle", error: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    loggedOut(state) {
      state.user = null;
    },
    rehydrated(state, action) {
      state.user = action.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(authLogin.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
      })
      .addCase(authLogin.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(authRegister.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(authRegister.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
      })
      .addCase(authRegister.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(authLogout.fulfilled, (s) => {
        s.user = null;
      });
  },
});

export const { loggedIn, loggedOut, rehydrated } = slice.actions;
export default slice.reducer;

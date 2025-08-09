import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, status: 'idle', error: null };

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loggedIn: (state, action) => { state.user = action.payload; },
        loggedOut: (state) => { state.user = null; },
    },
});

export const { loggedIn, loggedOut } = slice.actions;
export default slice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAuthenticate: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    StoreUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticate = true;
    },
    UpdateUser: (state, action) => {
      state.user = action.payload;
    },
    logoutuser: (state) => {
      state.user = null;
      state.isAuthenticate = false;
    },
  },
});

export const { StoreUser, UpdateUser, logoutuser } = authSlice.actions;
export default authSlice.reducer;

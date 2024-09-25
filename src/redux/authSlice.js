import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

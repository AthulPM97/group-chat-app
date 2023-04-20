import { createSlice } from "@reduxjs/toolkit";
import { history } from "../helpers/history";

const token = localStorage.getItem("token") || null;
const name = localStorage.getItem("name") || null;

const initialAuthState = {
  isLoggedIn: !!token,
  token: token,
  name: name,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.name = action.payload.name;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("name", JSON.stringify(action.payload.name));
    },
    logout(state, action) {
      state.isLoggedIn = false;
      localStorage.clear();
      history.navigate("/");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

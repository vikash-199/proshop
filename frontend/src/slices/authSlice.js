import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
/*
It checks if "userInfo" exists in localStorage:

 - If yes, it parses the JSON string back into an object.

 - If no, it defaults to null (user is not loggedin).

 This enables persistent login across page reloads by reading from localStorage.

*/

const authSlice = createSlice({
  name: "auth", // identify in redux store with the same name
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // update the redux state state.userInfo with the data fron action.payload
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Also stores the same info in localStorage, ensuring persistence even if the page reloads.
    },
    // This is for the local stuff
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions; //Exports the setCredentials action so it can be dispatched from components (e.g., after login).

export default authSlice.reducer;

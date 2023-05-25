import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { currUser: null },
  reducers: {
    setCredentials: (state, action) => {
      const user = action.payload;
      state.currUser = user;
    },
    logOut: (state, action) => {
      // console.log("test");
      state.currUser = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.currUser;

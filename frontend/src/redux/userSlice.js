import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User Slice",
  initialState: {
    isLogged: Boolean(localStorage.getItem("userData")),
    isAdmin: false,
    likesArray: [],
  },
  reducers: {
    isLoggedAction: (state) => {
      state.isLogged = !state.isLogged;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { isLoggedAction, setIsAdmin } = userSlice.actions;
export default userSlice.reducer;

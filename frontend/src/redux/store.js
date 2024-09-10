import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    themeSlice: themeSlice,
    userSlice: userSlice,
  },
});

export default store;

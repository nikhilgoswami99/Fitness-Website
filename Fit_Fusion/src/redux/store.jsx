/*
  Redux store configuration
  Purpose: Combine reducers and export a configured Redux store used by
           the app's `Provider` in `main.jsx`.
*/
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;

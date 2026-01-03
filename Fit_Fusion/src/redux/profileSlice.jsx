/*
  Redux Slice: profileSlice
  Purpose: Holds user's profile information and provides reducers to
           update fields, set the profile picture, and persist the
           profile to `localStorage` via `saveProfile`.
  Notes:
  - Initializes from `localStorage` key `userProfile` when available.
*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Nikhil Goswami",
  age: "25",
  height: "165",
  weight: "90",
  goalWeight: "70",
  bodyFat: "20.5",
  primaryGoal: "Weight Loss",
  targetDate: "2025-12-31",
  weeklyWorkouts: "5",
  dailyCalories: "2100",
  sleepTarget: "8",
  waterIntake: "3.5",
  profilePic:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: JSON.parse(localStorage.getItem("userProfile")) || initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    saveProfile: (state) => {
      localStorage.setItem("userProfile", JSON.stringify(state));
    },
  },
});

export const { updateProfile, saveProfile, setProfilePic } = profileSlice.actions;
export default profileSlice.reducer;

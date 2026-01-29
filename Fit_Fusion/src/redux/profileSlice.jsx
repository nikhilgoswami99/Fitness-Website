import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateCurrentUser, updateProfilePicture } from "../services/appwrite";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

export const updateProfileAsync = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const updatedUser = await updateCurrentUser(profileData);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateProfilePicAsync = createAsyncThunk(
  "profile/updateProfilePic",
  async ({ file, userId }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateProfilePicture(file, userId);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const payload = action.payload;
      // Map fullName to name for UI consistency if coming from backend
      if (payload.fullName && !payload.name) {
        payload.name = payload.fullName;
      }
      // Merge to support partial updates and hydration
      state.profile = { ...state.profile, ...payload };
    },
    setProfilePic: (state, action) => {
      if (state.profile) {
        state.profile.profilePic = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        // Map fullName to name
        if (payload.fullName && !payload.name) {
            payload.name = payload.fullName;
        }

        if (state.profile) {
            Object.assign(state.profile, payload);
        } else {
            state.profile = payload;
        }
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfilePicAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePicAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfilePicAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile, setProfilePic } = profileSlice.actions;

export const selectProfile = (state) => state.profile.profile;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;


export default profileSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveWorkout, getSavedWorkouts, removeSavedWorkout } from "../services/appwrite";

// Async Thunks

// Fetch saved workouts for a user
export const fetchSavedWorkouts = createAsyncThunk(
  "savedWorkouts/fetchSavedWorkouts",
  async (userId, { rejectWithValue }) => {
    try {
      const workouts = await getSavedWorkouts(userId);
      return workouts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Save a new workout
export const addSavedWorkout = createAsyncThunk(
  "savedWorkouts/addSavedWorkout",
  async (workoutData, { rejectWithValue }) => {
    try {
      const newWorkout = await saveWorkout(workoutData);
      return newWorkout;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove a saved workout
export const deleteSavedWorkout = createAsyncThunk(
  "savedWorkouts/deleteSavedWorkout",
  async (documentId, { rejectWithValue }) => {
    try {
      await removeSavedWorkout(documentId);
      return documentId; // Return ID to remove from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const savedWorkoutsSlice = createSlice({
  name: "savedWorkouts",
  initialState: {
    workouts: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: Clear workouts on logout
    clearWorkouts: (state) => {
      state.workouts = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Workouts
      .addCase(fetchSavedWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchSavedWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Workout
      .addCase(addSavedWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSavedWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts.push(action.payload);
      })
      .addCase(addSavedWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Workout
      .addCase(deleteSavedWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSavedWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = state.workouts.filter(
          (workout) => workout.$id !== action.payload
        );
      })
      .addCase(deleteSavedWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWorkouts } = savedWorkoutsSlice.actions;
export default savedWorkoutsSlice.reducer;

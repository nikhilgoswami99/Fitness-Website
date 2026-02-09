import mongoose, { Schema } from "mongoose";

const workoutSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workoutName: {
      type: String,
      required: true,
    },
    targetMuscles: {
      type: String,
    },
    equipment: {
      type: String,
    },
    gifURL: {
      type: String,
    },
    bodypart: {
      type: String,
    },
    category: {
      type: String,
      default: "strength",
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Workout from "../models/workout.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const saveWorkout = asyncHandler(async (req, res) => {
    const { workoutName, targetMuscles, equipment, gifURL, bodypart, category } = req.body

    if (!workoutName) {
        throw new ApiError(400, "Workout name is required")
    }

    const workout = await Workout.create({
        userID: req.user._id,
        workoutName,
        targetMuscles,
        equipment,
        gifURL,
        bodypart,
        category
    })

    if (!workout) {
        throw new ApiError(500, "Something went wrong while saving workout")
    }

    return res
        .status(201)
        .json(new ApiResponse(200, workout, "Workout saved successfully"))
})

const getSavedWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ userID: req.user._id })

    return res
        .status(200)
        .json(new ApiResponse(200, workouts, "Saved workouts fetched successfully"))
})

const removeSavedWorkout = asyncHandler(async (req, res) => {
    const { workoutId } = req.params

    const workout = await Workout.findOneAndDelete({
        _id: workoutId,
        userID: req.user._id
    })

    if (!workout) {
        throw new ApiError(404, "Workout not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { workoutId }, "Workout removed successfully"))
})

export {
    saveWorkout,
    getSavedWorkouts,
    removeSavedWorkout
}

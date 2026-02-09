import { Router } from "express";
import { 
    saveWorkout, 
    getSavedWorkouts, 
    removeSavedWorkout 
} from "../controllers/workout.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(saveWorkout);
router.route("/").get(getSavedWorkouts);
router.route("/:workoutId").delete(removeSavedWorkout);

export default router;

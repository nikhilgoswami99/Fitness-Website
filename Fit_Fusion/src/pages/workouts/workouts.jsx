/*
  Page: Workouts (ExercisesGrid)
  Purpose: Fetch and display exercises for a selected `workoutType`.
  Behavior:
  - Reads `workoutType` from route params.
  - Fetches exercise list from the external exerciseDB API and
    supports simple pagination via `pageNum`.
  - Allows saving exercises to localStorage under `savedWorkouts`.
*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addSavedWorkout, fetchSavedWorkouts } from "../../redux/savedWorkoutsSlice";
import { useUser } from "../../context/userContext";
import styles from "./workouts.module.css";

const ExercisesGrid = () => {
  let { workoutType } = useParams();
  const { isAuthenticated, user } = useUser();
  const dispatch = useDispatch();
  
  // Select saved workouts from Redux state
  const { workouts: savedWorkouts, loading: saveLoading } = useSelector((state) => state.savedWorkouts);

  const [dataArr, setDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const limit = 8;

  // Fetch exercises from ExerciseDB
  const bodyPartData = async (workoutType, pageNum = 1) => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: `https://exercisedb.dev/api/v1/bodyparts/${encodeURIComponent(workoutType)}/exercises`,
      params: {
        limit: limit.toString(),
        offset: ((pageNum - 1) * limit).toString(),
      },
    };

    try {
      const response = await axios.request(options);
      
      setDataArr(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Failed to fetch exercises");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    bodyPartData(workoutType, pageNum);
  }, [workoutType, pageNum]);
  

  // Fetch saved workouts when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.accountID) {
      dispatch(fetchSavedWorkouts(user.accountID));
    }
  }, [isAuthenticated, user, dispatch]);

  const handleSaveWorkout = async (exercise) => {
    if (!isAuthenticated) {
      toast.info("Please login first to add workouts to your plan");
      return;
    }

    // Check if duplicate
    const alreadySaved = savedWorkouts.some(
      (item) => item.workoutName === exercise.name
    );

    if (alreadySaved) {
      toast.warning("This workout is already saved!");
      return;
    }

    try {
      // Prepare data for Appwrite
      const workoutData = {
        userID: user.accountID,
        workoutName: exercise.name,
        targetMuscles: exercise.target,
        equipment: exercise.equipment,
        gifURL: exercise.gifUrl,
        bodypart: workoutType,
        category: "strength", // Default category required by schema
      };

      // Dispatch action to save to Appwrite
      await dispatch(addSavedWorkout(workoutData)).unwrap();
      toast.success("Workout added to your plan!");
    } catch (err) {
      console.error("Error saving workout:", err);
      toast.error("Error saving workout");
    }
  };


  const titleText = `${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Exercises`;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>{titleText}</h1>

      {isLoading ? (
        <div className={styles.loading}>Loading exercises...</div>
      ) : (
        <div className={styles.grid}>
          {dataArr.map((exercise, index) => (
            <div key={index} className={styles.card}>
              <img
                src={exercise.gifUrl}
                alt={exercise.name}
                className={styles.image}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.exerciseName}>{exercise.name}</h3>
                <p className={styles.subText}>
                  {exercise.target} • {exercise.equipment}
                </p>
                <button
                  onClick={() => handleSaveWorkout(exercise)}
                  className={styles.addButton}
                  disabled={saveLoading}
                >
                  {saveLoading ? "Saving..." : "+ Add to Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => setPageNum((prev) => Math.max(1, prev - 1))}
          disabled={pageNum === 1}
        >
          Previous
        </button>
        <span className={styles.pageNum}>Page {pageNum}</span>
        <button
          className={styles.pageButton}
          onClick={() => setPageNum((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExercisesGrid;

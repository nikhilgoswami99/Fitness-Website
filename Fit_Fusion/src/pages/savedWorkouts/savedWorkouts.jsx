/*
  Page: SavedWorkouts
  Purpose: Show workouts saved by the user in localStorage grouped by
           body part / workout category.
  Behavior:
  - Reads `savedWorkouts` from localStorage which is an object keyed by
    workoutType (e.g., `chest`, `legs`).
  - Allows removal of individual exercises and persists changes.
*/
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedWorkouts, deleteSavedWorkout } from "../../redux/savedWorkoutsSlice";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import styles from "./savedWorkouts.module.css";

const SavedWorkouts = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useUser();
  const { workouts, loading, error } = useSelector((state) => state.savedWorkouts);

  useEffect(() => {
    if (isAuthenticated && user?.accountID) {
      dispatch(fetchSavedWorkouts(user.accountID));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleRemove = async (documentId) => {
    try {
      await dispatch(deleteSavedWorkout(documentId)).unwrap();
      toast.success("Workout removed successfully");
    } catch (err) {
      console.error("Failed to remove workout:", err);
      toast.error("Failed to remove workout");
    }
  };

  // Group workouts by bodypart
  const groupedWorkouts = workouts.reduce((acc, workout) => {
    const type = workout.bodypart || "Others";
    if (!acc[type]) acc[type] = [];
    acc[type].push(workout);
    return acc;
  }, {});

  const categories = Object.keys(groupedWorkouts);

  if (!isAuthenticated) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Your Saved Workouts</h1>
        <p className={styles.emptyText}>Please login to view your saved workouts.</p>
      </div>
    );
  }

  if (loading && workouts.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Your Saved Workouts</h1>
        <div className={styles.loading}>Loading saved workouts...</div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Your Saved Workouts</h1>

      {categories.length === 0 ? (
        <p className={styles.emptyText}>No workouts saved yet.</p>
      ) : (
        categories.map((type) => (
          <div key={type} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>

            <div className={styles.grid}>
              {groupedWorkouts[type].map((workout) => (
                <div key={workout.$id} className={styles.card}>
                  <img
                    src={workout.gifURL}
                    alt={workout.workoutName}
                    className={styles.image}
                  />
                  <div className={styles.cardContent}>
                    <h3 className={styles.exerciseName}>{workout.workoutName}</h3>
                    <p className={styles.subText}>
                      {workout.targetMuscles} • {workout.equipment}
                    </p>

                    <button
                      onClick={() => handleRemove(workout.$id)}
                      className={styles.removeButton}
                      disabled={loading}
                    >
                      {loading ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedWorkouts;

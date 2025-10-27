import { useEffect, useState } from "react";
import styles from "./savedWorkouts.module.css";

const SavedWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedWorkouts")) || [];
    setSavedWorkouts(stored);
  }, []);

  const handleRemove = (exerciseName) => {
    const updated = savedWorkouts.filter((item) => item.name !== exerciseName);
    setSavedWorkouts(updated);
    localStorage.setItem("savedWorkouts", JSON.stringify(updated));
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Your Saved Workouts</h1>

      {savedWorkouts.length === 0 ? (
        <p className={styles.emptyText}>No workouts saved yet.</p>
      ) : (
        <div className={styles.grid}>
          {savedWorkouts.map((exercise, index) => (
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
                  onClick={() => handleRemove(exercise.name)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedWorkouts;

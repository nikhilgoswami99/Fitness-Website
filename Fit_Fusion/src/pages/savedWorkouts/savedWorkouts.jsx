import { useEffect, useState } from "react";
import styles from "./savedWorkouts.module.css";

const SavedWorkouts = () => {
  const [savedWorkouts, setSavedWorkouts] = useState({}); // now object instead of array

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedWorkouts")) || {};
    setSavedWorkouts(stored);
  }, []);

  const handleRemove = (workoutType, exerciseName) => {
    const updated = { ...savedWorkouts };
    
    // remove exercise from specific category
    updated[workoutType] = updated[workoutType].filter(
      (item) => item.name !== exerciseName
    );

    // if category becomes empty, delete it
    if (updated[workoutType].length === 0) {
      delete updated[workoutType];
    }

    setSavedWorkouts(updated);
    localStorage.setItem("savedWorkouts", JSON.stringify(updated));
  };

  const categories = Object.keys(savedWorkouts);

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
              {savedWorkouts[type].map((exercise, index) => (
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
                      onClick={() => handleRemove(type, exercise.name)}
                      className={styles.removeButton}
                    >
                      Remove
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./workouts.module.css";

const ExercisesGrid = () => {
  let { workoutType } = useParams();

  const [dataArr, setDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const limit = 8;

  const bodyPartData = async (workoutType, pageNum = 1) => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${workoutType}`,
      params: {
        limit: limit.toString(),
        offset: ((pageNum - 1) * limit).toString(),
      },
      headers: {
        "x-rapidapi-key": "41ef75cbcamsh58da2adee279124p18cba7jsn021699ab6e69",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setDataArr(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    bodyPartData(workoutType, pageNum);
  }, [workoutType, pageNum]);

  const handleSaveWorkout = (exercise) => {
    try {
      // Retrieve existing saved workouts (or start with an empty array)
      const existingWorkouts =
        JSON.parse(localStorage.getItem("savedWorkouts")) || [];

      // Avoid duplicates based on exercise ID or name
      const alreadySaved = existingWorkouts.some(
        (item) => item.id === exercise.id || item.name === exercise.name
      );

      if (alreadySaved) {
        alert("This workout is already saved!");
        return;
      }

      const updatedWorkouts = [...existingWorkouts, exercise];

      // Save updated list without touching diet details
      localStorage.setItem("savedWorkouts", JSON.stringify(updatedWorkouts));

      alert("Workout added to your saved list!");
    } catch (err) {
      console.error("Error saving workout:", err);
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
                >
                  + Add to Plan
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

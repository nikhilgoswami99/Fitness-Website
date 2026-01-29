/*
  Component: EditProfile
  Purpose: Form UI to edit the user's profile stored in Redux.
  Behavior:
  - Reads `profile` from Redux via `useSelector`.
  - Dispatches `updateProfile` on input changes to keep state synced.
  - Uses a `map` to translate input `id`s to Redux keys.
*/
import React from "react";
import styles from "./editProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setProfile, selectProfile } from "../../redux/profileSlice";

function EditProfile() {
  const dispatch = useDispatch();

  // ✅ Get current profile directly from Redux
  const profile = useSelector(selectProfile);
  
  
  if (!profile) return null;

  // ✅ Handle input changes — instantly update Redux state
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Map input IDs to Redux keys and their expected types
    const fieldConfig = {
      name: { key: "name", type: "string", maxLength: 50 },
      age: { key: "age", type: "integer", max: 150 },
      height: { key: "height", type: "integer" },
      weight: { key: "weight", type: "integer" },
      goalWeight: { key: "goalWeight", type: "integer" },
      fat: { key: "bodyFat", type: "integer" }, // Schema says integer
      goal: { key: "primaryGoal", type: "string", maxLength: 50 },
      date: { key: "targetDate", type: "datetime" }, 
      weeklyWorkouts: { key: "weeklyWorkouts", type: "integer" },
      calories: { key: "dailyCalories", type: "integer" },
      sleep: { key: "sleepTarget", type: "integer" },
      water: { key: "waterIntake", type: "integer" }, // Schema says integer
    };

    const config = fieldConfig[id];
    if (!config) return;

    let processedValue = value;

    if (config.type === "integer") {
      processedValue = value === "" ? "" : parseInt(value, 10);
      if (isNaN(processedValue)) processedValue = "";
    }
    
    // Enforce Max Length for strings
    if (config.type === "string" && config.maxLength && value.length > config.maxLength) {
        return; // Prevent update if too long
    }

    dispatch(setProfile({ [config.key]: processedValue }));
  };

  // Helper to avoid undefined values
  const safeValue = (val) => (val !== undefined && val !== null ? val : "");

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <h3 className={styles.heading}>Edit Personal Information</h3>

        <div className={styles.inputBox}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={safeValue(profile.name)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="age" className={styles.label}>Age (years)</label>
          <input
            id="age"
            type="number"
            className={styles.input}
            value={safeValue(profile.age)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="height" className={styles.label}>Height (cm)</label>
          <input
            id="height"
            type="number"
            className={styles.input}
            value={safeValue(profile.height)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="weight" className={styles.label}>Weight (kg)</label>
          <input
            id="weight"
            type="number"
            className={styles.input}
            value={safeValue(profile.weight)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="goalWeight" className={styles.label}>Goal Weight (kg)</label>
          <input
            id="goalWeight"
            type="number"
            className={styles.input}
            value={safeValue(profile.goalWeight)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="fat" className={styles.label}>Body Fat (%)</label>
          <input
            id="fat"
            type="number"
            className={styles.input}
            value={safeValue(profile.bodyFat)}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.heading}>Edit Fitness Goals</h3>

        <div className={styles.inputBox}>
          <label htmlFor="goal" className={styles.label}>Primary Goal</label>
          <select
            id="goal"
            className={styles.input}
            value={safeValue(profile.primaryGoal)}
            onChange={handleChange}
          >
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Maintenance</option>
          </select>
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="date" className={styles.label}>Target Date</label>
          <input
            id="date"
            type="date"
            className={styles.input}
            value={safeValue(profile.targetDate)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="weeklyWorkouts" className={styles.label}>Weekly Workouts</label>
          <input
            id="weeklyWorkouts"
            type="number"
            className={styles.input}
            value={safeValue(profile.weeklyWorkouts)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="calories" className={styles.label}>Daily Calories</label>
          <input
            id="calories"
            type="number"
            className={styles.input}
            value={safeValue(profile.dailyCalories)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="sleep" className={styles.label}>Sleep Target (hours)</label>
          <input
            id="sleep"
            type="number"
            className={styles.input}
            value={safeValue(profile.sleepTarget)}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="water" className={styles.label}>Water Intake (liters)</label>
          <input
            id="water"
            type="number"
            className={styles.input}
            value={safeValue(profile.waterIntake)}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

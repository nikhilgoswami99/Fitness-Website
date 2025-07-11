import React from "react";
import styles from "./editProfile.module.css";

function EditProfile() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <h3 className={styles.heading}>Edit Personal Information</h3>

        <div className={styles.inputBox}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input id="name" type="text" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="age" className={styles.label}>Age (years)</label>
          <input id="age" type="number" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="height" className={styles.label}>Height (cm)</label>
          <input id="height" type="number" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="weight" className={styles.label}>Weight (kg)</label>
          <input id="weight" type="number" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="goalWeight" className={styles.label}>Goal Weight (kg)</label>
          <input id="goalWeight" type="number" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="fat" className={styles.label}>Body Fat (%)</label>
          <input id="fat" type="number" className={styles.input} />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.heading}>Edit Fitness Goals</h3>

        <div className={styles.inputBox}>
          <label htmlFor="goal" className={styles.label}>
            Primary Goal
          </label>
          <select id="goal" className={styles.input}>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Maintenance</option>
          </select>
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="date" className={styles.label}>
            Target Date
          </label>
          <input id="date" type="date" className={styles.input} />
        </div>


        <div className={styles.inputBox}>
          <label htmlFor="weeklyWorkouts" className={styles.label}>
            Weekly Workouts
          </label>
          <input id="weeklyWorkouts" type="number" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="calories" className={styles.label}>
            Daily Calories
          </label>
          <input id="calories" type="number" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="sleep" className={styles.label}>
            Sleep Target (hours)
          </label>
          <input id="sleep" type="number" className={styles.input} />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="water" className={styles.label}>
            Water Intake (liters)
          </label>
          <input id="water" type="number" className={styles.input} />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

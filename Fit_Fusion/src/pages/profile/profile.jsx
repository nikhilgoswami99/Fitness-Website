import React, { useState } from "react";
import styles from "./profile.module.css";

import EditProfile from "../../components/editProfile/editProfile";

import { IoCameraOutline } from "react-icons/io5";

function Profile() {
  const [image, setImage] = useState(null);
  const [changeImg, setChangeImg] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const personalInfo = {
    age: "28 years",
    height: '165.00 cm (65")',
    weight: "70.00 kg (154 lbs)",
    goalWeight: "65.00 kg (143 lbs)",
    bodyFat: "12.50%",
    bmi: "25.7",
  };

  const fitnessGoals = {
    primaryGoal: "Weight Loss",
    targetDate: "Dec 31, 2025",
    weeklyWorkouts: "5 sessions",
    dailyCalories: "2200 kcal",
    sleepTarget: "8 hours",
    waterIntake: "3.50 liters",
  };

  const handleProfileEdit = () => {
    setEditProfile((prev) => {
      return !prev;
    });
  };

  const handleImageChange = () => {
    setChangeImg(true);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setChangeImg(false);
  };

  return (
    <div className={styles.profilePage}>
      {changeImg && (
        <input
          onChange={handleImage}
          type="file"
          className={styles.chooseFile}
        />
      )}
      <div className={styles.userName}>
        <div className={styles.profilePicture}>
          <img
            src={
              image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="Profile Picture"
          />
        </div>
        <button onClick={handleImageChange} className={styles.changeImgBtn}>
          <IoCameraOutline />
        </button>
        <div className={styles.name}>
          <p>Nikhil Goswami</p>
          <button onClick={handleProfileEdit} className={styles.editBtn}>
            Edit Profile
          </button>
        </div>
      </div>

      {editProfile ? (
        <EditProfile />
      ) : (
        <div className={styles.container}>
          {/* Personal Information Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Personal Information</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Age</span>
                <span className={styles.infoValue}>{personalInfo.age}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Height</span>
                <span className={styles.infoValue}>{personalInfo.height}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Weight</span>
                <span className={styles.infoValue}>{personalInfo.weight}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Goal Weight</span>
                <span className={styles.infoValue}>
                  {personalInfo.goalWeight}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Body Fat</span>
                <span className={styles.infoValue}>{personalInfo.bodyFat}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>BMI</span>
                <span className={styles.infoValue}>{personalInfo.bmi}</span>
              </div>
            </div>
          </div>

          {/* Fitness Goals Card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Fitness Goals</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Primary Goal</span>
                <span className={styles.goalBadge}>
                  {fitnessGoals.primaryGoal}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Target Date</span>
                <span className={styles.infoValue}>
                  {fitnessGoals.targetDate}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Weekly Workouts</span>
                <span className={styles.infoValue}>
                  {fitnessGoals.weeklyWorkouts}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Daily Calories</span>
                <span className={styles.infoValue}>
                  {fitnessGoals.dailyCalories}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Sleep Target</span>
                <span className={styles.infoValue}>
                  {fitnessGoals.sleepTarget}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Water Intake</span>
                <span className={styles.infoValue}>
                  {fitnessGoals.waterIntake}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My workout plans */}

      <div className={styles.myPlans}>
        <h2 className={styles.planHeading}>My Workout Plans</h2>
        <div className={styles.planCard}>
          <div className={styles.planHeader}>
            <h3 className={styles.title}>Push/Pull/Legs</h3>
            <span className={styles.status}>Active</span>
          </div>
          <p className={styles.description}>
            6-day split focusing on compound movements
          </p>
          <div className={styles.progressInfo}>
            <span>Progress: 68%</span>
            <span>Week 4/6</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
          <button className={styles.continueBtn}>Continue Workout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

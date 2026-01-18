/*
  Page: Profile
  Purpose: Show user's profile summary, allow image change and
           toggling into edit mode which uses `EditProfile`.
  Behavior:
  - Uses Redux `profile` for persistent user data.
  - Local UI state for `changeImg` and `editProfileMode`.
  - `handleImage` reads a file and stores a base64 image via Redux.
*/
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../components/editProfile/editProfile";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, setProfilePic } from "../../redux/profileSlice";
import { getCurrentUser, logoutUser } from "../../services/appwrite";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Access global profile state from Redux
  const profile = useSelector((state) => state.profile);

  // Local UI flags only
  const [changeImg, setChangeImg] = useState(false);
  const [editProfileMode, setEditProfileMode] = useState(false);

  // ✅ Handle profile picture change
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setProfilePic(reader.result));
      setChangeImg(false);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Handle Save button (commit to localStorage)
  const handleSaveProfile = () => {
    dispatch(saveProfile());
    setEditProfileMode(false);
  };

  // ✅ Navigate
  const navigateToSavedWorkouts = () => {
    navigate(`/savedWorkouts`);
  };

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      
      // Navigate to sign-in page after successful logout
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      alert(error.message || "Failed to logout. Please try again.");
    }
  };

  // Derived data
  const personalInfo = {
    age: profile.age,
    height: profile.height,
    weight: profile.weight,
    goalWeight: profile.goalWeight,
    bodyFat: profile.bodyFat,
    bmi: profile.bmi,
  };

  const fitnessGoals = {
    primaryGoal: profile.primaryGoal,
    targetDate: profile.targetDate,
    weeklyWorkouts: profile.weeklyWorkouts,
    dailyCalories: profile.dailyCalories,
    sleepTarget: profile.sleepTarget,
    waterIntake: profile.waterIntake,
  };

  return (
    <div className={styles.profilePage}>
      {/* ✅ Image change popup */}
      {changeImg && (
        <div className={styles.chooseImgPopUp}>
          <label htmlFor="fileInput" className={styles.customFileBtn}>
            Choose Image
          </label>
          <input
            id="fileInput"
            type="file"
            className={styles.chooseFile}
            onChange={handleImage}
            accept="image/*"
          />
        </div>
      )}

      {/* ✅ Profile header */}
      <div className={styles.userName}>
        <div className={styles.ImgBtnBox}>
          <div className={styles.profilePicture}>
            <img src={profile.profilePic} alt="Profile" />
          </div>
          <button
            onClick={() => setChangeImg(true)}
            className={styles.changeImgBtn}
          >
            <IoCameraOutline />
          </button>
        </div>

        <div className={styles.name}>
          <p>{profile.name}</p>
          <div className={styles.btnSection}>
            {!editProfileMode ? (
              <button
                onClick={() => setEditProfileMode(true)}
                className={styles.editBtn}
              >
                Edit Profile
              </button>
            ) : (
              <button onClick={handleSaveProfile} className={styles.saveBtn}>
                Save Changes
              </button>
            )}
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Main section */}
      {editProfileMode ? (
        <EditProfile /> // handles updates through Redux
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Personal Information</h2>
            <div className={styles.infoList}>
              {Object.entries(personalInfo).map(([key, value]) => (
                <div className={styles.infoItem} key={key}>
                  <span className={styles.infoLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span className={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Fitness Goals</h2>
            <div className={styles.infoList}>
              {Object.entries(fitnessGoals).map(([key, value]) => (
                <div className={styles.infoItem} key={key}>
                  <span className={styles.infoLabel}>
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Workout plans section */}
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
          <button
            onClick={navigateToSavedWorkouts}
            className={styles.continueBtn}
          >
            View Workout Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

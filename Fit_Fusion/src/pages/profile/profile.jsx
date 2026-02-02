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
import { setProfilePic, updateProfileAsync, selectProfile, updateProfilePicAsync } from "../../redux/profileSlice";
import {logoutUser } from "../../services/appwrite";
import { useUser } from "../../context/userContext.jsx";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Access global profile state from Redux
  const profile = useSelector(selectProfile);
  
  
  // ✅ Get user context to clear user state on logout
  const { clearUser } = useUser();

  // Local UI flags only
  const [changeImg, setChangeImg] = useState(false);
  const [editProfileMode, setEditProfileMode] = useState(false);
  
  if (!profile) {
    return <div className={styles.loading}>Loading Profile...</div>;
  }



  // ✅ Handle profile picture change
  // ✅ Handle profile picture change
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (profile && profile.$id) {
       dispatch(updateProfilePicAsync({ file, userId: profile.$id }));
       setChangeImg(false);
    }
  };

  // ✅ Handle Save button (commit to localStorage)
  // ✅ Handle Save button (commit to localStorage)
  const handleSaveProfile = () => {
    dispatch(updateProfileAsync(profile))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
        setEditProfileMode(false);
      })
      .catch((err) => {
        toast.error(err || "Failed to update profile");
      });
  };



  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      // Step 1: Logout from Appwrite
      await logoutUser();

      // Step 2: Clear user from context
      clearUser();

      // Step 3: Show success message
      toast.success("Logged out successfully!");

      // Step 4: Navigate to sign-in page
      navigate("/login");
    } catch (error) {
      // Show error message
      console.error("Logout error:", error);
      toast.error(error.message || "Failed to logout. Please try again.");
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
            <img src={profile.profileImage} alt="Profile" />
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


    </div>
  );
}

export default Profile;

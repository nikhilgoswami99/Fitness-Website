/*
  Page: Home
  Purpose: Dashboard showing quick activity stats, profile summary,
           and an exploration grid of exercise categories.
  Key pieces:
  - Reads `profile` from Redux to show personal stats.
  - Renders `Card` components for each `workoutType` and navigates
    to the `Workouts` page when a card is clicked.
*/
import Card from "../../components/bodyPartCard/card";
import styles from "./home.module.css";

import { useDispatch, useSelector } from "react-redux";

import workoutTypes from "../../../public/exerciseTypes";
import Chart from "../../components/workoutChart/chart";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { MdFitnessCenter, MdLocalFireDepartment, MdWaterDrop, MdHotel } from "react-icons/md";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const data = useSelector((state) => state.profile);

  // If user is logged in but data hasn't arrived in Redux yet, show loading
  if (isAuthenticated && !data.profile) {
    return <div className={styles.loading}>Loading Profile...</div>;
  }
  

  let handleCardClick = (workoutType) => {
    navigate(`workouts/${workoutType}`);
  };



  const cardColors = [
    "rgb(51, 134, 238)",
    "rgb(236, 58, 118)",
    "rgb(255, 166, 35)",
    "rgb(39, 198, 219)",
  ];




  const goalProgress = data.profile?.weight && data.profile?.goalWeight
    ? Math.round(((data.profile.weight - data.profile.goalWeight) / data.profile.weight) * 100)
    : 0;

  return (
    <>
      <section className={styles.homePage}>
        <div className={styles.mainContent}>
          
          {/* ==== MY ACTIVITIES ==== */}
          {isAuthenticated && data.profile && (
            <div className={styles.myActivity}>
              <h2 className={styles.heading}>My Activities</h2>
              <div className={styles.activityContainer}>
                <div
                  style={{ backgroundColor: `${cardColors[0]}` }}
                  className={styles.activityCard}
                >
                  <div className={styles.cardHeader}>
                    <MdFitnessCenter className={styles.cardIcon} />
                    <span className={styles.goalCompleted}>{data.profile.weeklyWorkouts}</span>
                  </div>
                  <p className={styles.activityName}>Weekly Workouts</p>
                  <p>Target: {data.profile.weeklyWorkouts}/7</p>
                </div>
                <div
                  style={{ backgroundColor: `${cardColors[1]}` }}
                  className={styles.activityCard}
                >
                  <div className={styles.cardHeader}>
                    <MdLocalFireDepartment className={styles.cardIcon} />
                    <span className={styles.goalCompleted}>{data.profile.dailyCalories}</span>
                  </div>
                  <p className={styles.activityName}>Calories / Day</p>
                  <p>Goal: {data.profile.primaryGoal}</p>
                </div>
                <div
                  style={{ backgroundColor: `${cardColors[2]}` }}
                  className={styles.activityCard}
                >
                  <div className={styles.cardHeader}>
                    <MdWaterDrop className={styles.cardIcon} />
                    <span className={styles.goalCompleted}>{data.profile.waterIntake}L</span>
                  </div>
                  <p className={styles.activityName}>Water / Day</p>
                  <p>Stay Hydrated 💧</p>
                </div>
                <div
                  style={{ backgroundColor: `${cardColors[3]}` }}
                  className={styles.activityCard}
                >
                  <div className={styles.cardHeader}>
                    <MdHotel className={styles.cardIcon} />
                    <span className={styles.goalCompleted}>{data.profile.sleepTarget}h</span>
                  </div>
                  <p className={styles.activityName}>Sleep Target</p>
                  <p>Goal Progress: {goalProgress}%</p>
                </div>
              </div>
            </div>
          )}

          {/* ==== EXPLORE EXERCISES ==== */}
          <div className={styles.workoutSection}>
            <div className={styles.exercises}>
              <h2 className={styles.heading}>Explore Exercises</h2>
              <div className={styles.cardContainer}>
                {workoutTypes.map((obj, idx) => {
                  return (
                    <Card
                      handleCardClick={handleCardClick}
                      key={idx}
                      obj={obj}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==== PROFILE SECTION ==== */}
        {/* Profile Section has been moved to Sidebar component */}
      </section>

      {/* ACTIVITY TRACKING SECTION */}
      {/* <div className={styles.activityTracking}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 className={styles.heading}>Activity Statistics</h2>
        </div>
        <div className={styles.chartContainer}>
          <Chart />
        </div>
      </div> */}
    </>
  );
}

export default Home;

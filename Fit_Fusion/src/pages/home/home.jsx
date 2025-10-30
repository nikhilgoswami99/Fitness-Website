import Card from "../../components/bodyPartCard/card";
import styles from "./home.module.css";

import { useDispatch, useSelector } from "react-redux";

import workoutTypes from "../../../public/exerciseTypes";
import Chart from "../../components/workoutChart/chart";
import { useNavigate } from "react-router-dom";

function Home() {

  const profile = useSelector((state) => state.profile);

  const navigate = useNavigate();

  let handleCardClick = (workoutType) => {
    navigate(`workouts/${workoutType}`);
  };

  let navigateToSavedWorkouts = () => {
    navigate(`savedWorkouts`);
  }

  const cardColors = [
    "rgb(51, 134, 238)",
    "rgb(236, 58, 118)",
    "rgb(255, 166, 35)",
    "rgb(39, 198, 219)",
  ];

const workoutDays = [
  { label: "Push – Chest, Shoulders, Triceps", time: "Monday" },
  { label: "Pull – Back, Biceps", time: "Tuesday" },
  { label: "Legs – Quads, Hamstrings, Glutes, Calves", time: "Wednesday" },
  { label: "Rest / Active Recovery (Light cardio / Stretching)", time: "Thursday" },
  { label: "Push – Chest, Shoulders, Triceps", time: "Friday" },
  { label: "Pull – Back, Biceps", time: "Saturday" },
  { label: "Legs + Core", time: "Sunday" },
];


  const goalProgress = Math.round(
    ((profile.weight - profile.goalWeight) / profile.weight) * 100
  );

  return (
    <>
      <section className={styles.homePage}>
        <div className={styles.mainContent}>
          
          {/* ==== MY ACTIVITIES ==== */}
          <div className={styles.myActivity}>
            <h2 className={styles.heading}>My Activities</h2>
            <div className={styles.activityContainer}>
              <div
                style={{ backgroundColor: `${cardColors[0]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>{profile.weeklyWorkouts}</p>
                <p>Weekly Workouts</p>
                <p>Target: {profile.weeklyWorkouts}/7</p>
              </div>
              <div
                style={{ backgroundColor: `${cardColors[1]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>{profile.dailyCalories}</p>
                <p>Calories / Day</p>
                <p>Goal: {profile.primaryGoal}</p>
              </div>
              <div
                style={{ backgroundColor: `${cardColors[2]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>{profile.waterIntake}L</p>
                <p>Water / Day</p>
                <p>Stay Hydrated 💧</p>
              </div>
              <div
                style={{ backgroundColor: `${cardColors[3]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>{profile.sleepTarget}h</p>
                <p>Sleep Target</p>
                <p>Goal Progress: {goalProgress}%</p>
              </div>
            </div>
          </div>

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
        <div className={styles.profileSection}>
          <div className={styles.myCardWrapper}>
            <div className={styles.myCardProfile}>
              <img
                src={profile.profilePic||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                alt="John Watson"
                className={styles.myCardImage}
              />
              <div>
                <h2 className={styles.myCardName}>{profile.name}</h2>
                <p className={styles.myCardSubtitle}>{profile.age} Years Athlete</p>
              </div>
            </div>
            <div className={styles.myCardStats}>
              <div className={styles.myCardStat}>
                <p className={styles.myCardWeightLabel}>Weight</p>
                <p className={styles.myCardValue}>{profile.weight} kg</p>
              </div>
              <div className={styles.myCardStat}>
                <p className={styles.myCardHeightLabel}>Height</p>
                <p className={styles.myCardValue}>{profile.height} cm</p>
              </div>
              <div className={styles.myCardStat}>
                <p className={styles.myCardGoalLabel}>Goal</p>
                <p className={styles.myCardValue}>{profile.goalWeight} kg</p>
              </div>
            </div>
          </div>

          <div className={styles.planContainer}>
            <div className={styles.header}>
              <span className={styles.title}>Current Plan</span>
              <span className={styles.status}>Active</span>
            </div>
            <div className={styles.planList}>
              {workoutDays.map((day, idx) => (
                <div key={idx} className={styles.planRow}>
                  <span className={styles.planLabel}>{day.label}</span>
                  <span className={styles.planTime}>{day.time}</span>
                </div>
              ))}
            </div>
            <button onClick={navigateToSavedWorkouts} className={styles.fullPlanButton}>View Full Plan</button>
          </div>
        </div>
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

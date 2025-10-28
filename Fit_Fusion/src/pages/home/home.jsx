import Card from "../../components/bodyPartCard/card";
import styles from "./home.module.css";

import workoutTypes from "../../../public/exerciseTypes";
import Chart from "../../components/workoutChart/chart";
import { useNavigate } from "react-router-dom";

function Home() {
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
    { label: "Push Day", time: "Monday" },
    { label: "Pull Day", time: "Tuesday" },
    { label: "Leg Day", time: "Wednesday" },
    { label: "Leg Day", time: "Thursday" },
    { label: "Leg Day", time: "Friday" },
    { label: "Leg Day", time: "Saturday" },
    { label: "Leg Day", time: "Sunday" },
  ];

  return (
    <>
      <section className={styles.homePage}>
        <div className={styles.mainContent}>
          <div className={styles.myActivity}>
            <h2 className={styles.heading}>My Activities</h2>
            <div className={styles.activityContainer}>
              <div
                style={{ backgroundColor: `${cardColors[0]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>12</p>
                <p>Workouts</p>
                <p>Target: 15</p>
              </div>
              <div
                style={{ backgroundColor: `${cardColors[1]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>12</p>
                <p>Workouts</p>
                <p>Target: 15</p>
              </div>
              <div
                style={{ backgroundColor: `${cardColors[2]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>12</p>
                <p>Workouts</p>
                <p>Target: 15</p>
              </div>
              <div
                style={{ backgroundColor: `${cardColors[3]}` }}
                className={styles.activityCard}
              >
                <p className={styles.goalCompleted}>12</p>
                <p>Workouts</p>
                <p>Target: 15</p>
              </div>
            </div>
          </div>

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
        <div className={styles.profileSection}>
          <div className={styles.myCardWrapper}>
            <div className={styles.myCardProfile}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="John Watson"
                className={styles.myCardImage}
              />
              <div>
                <h2 className={styles.myCardName}>Nikhil Goswami</h2>
                <p className={styles.myCardSubtitle}>25 Years Athlete</p>
              </div>
            </div>
            <div className={styles.myCardStats}>
              <div className={styles.myCardStat}>
                <p className={styles.myCardWeightLabel}>Weight</p>
                <p className={styles.myCardValue}>70 kg</p>
              </div>
              <div className={styles.myCardStat}>
                <p className={styles.myCardHeightLabel}>Height</p>
                <p className={styles.myCardValue}>165 cm</p>
              </div>
              <div className={styles.myCardStat}>
                <p className={styles.myCardGoalLabel}>Goal</p>
                <p className={styles.myCardValue}>65 kg</p>
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

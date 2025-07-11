import Card from "../../components/bodyPartCard/card";
import styles from "./home.module.css";

import workoutTypes from '../../../public/exerciseTypes'
import Chart from '../../components/workoutChart/chart'

function Home() {
  const cardColors = [
    "rgb(51, 134, 238)",
    "rgb(236, 58, 118)",
    "rgb(255, 166, 35)",
    "rgb(39, 198, 219)",
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
                return <Card key={idx} obj={obj}/>
              })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileSection}></div>
      </section>



      <div className={styles.activityTracking}>
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
        <Chart/>
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import styles from "./reports.module.css";
import CircularProgress from "@mui/joy/CircularProgress";
import { AiOutlineEye } from "react-icons/ai";

function Reports() {
  const [data, setData] = useState(null);

  const getData = async () => {
    let temp = [
      {
        name: "Calories Intake",
        value: 2000,
        unit: "kcal",
        goal: 2500,
        goalUnit: "kcal",
      },
      {
        name: "Sleep",
        value: 8,
        unit: "hrs",
        goal: 8,
        goalUnit: "hrs",
      },
      {
        name: "Steps",
        value: 50,
        unit: "steps",
        goal: 10000,
        goalUnit: "steps",
      },
      {
        name: "Water",
        value: 2000,
        unit: "ml",
        goal: 3000,
        goalUnit: "ml",
      },
      {
        name: "Weight",
        value: 75,
        unit: "kg",
        goal: 70,
        goalUnit: "kg",
      },
      {
        name: "Workout",
        value: 2,
        unit: "days",
        goal: 6,
        goalUnit: "days",
      },
    ];
    setData(temp);
  };

  useEffect(() => {
    getData();
    
  }, []);


  function simplifyFraction(numerator, denominator) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  const commonDivisor = gcd(numerator, denominator);

  const simplifiedNumerator = numerator / commonDivisor;
  const simplifiedDenominator = denominator / commonDivisor;

  return [simplifiedNumerator, simplifiedDenominator];
}




  return <div className={styles.meters}>

    {
  data?.length > 0 &&
    data.map((item, index) => {
      return (
        <div className={styles.card} key={index}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderBox}>
              <div className={styles.cardHeaderBoxName}>{item.name}</div>
              <div className={styles.cardHeaderBoxValue}>
                {item.value} {item.unit}
              </div>
            </div>
            <div className={styles.cardHeaderBox}>
              <div className={styles.cardHeaderBoxName}>Target</div>
              <div className={styles.cardHeaderBoxValue}>
                {item.goal} {item.goalUnit}
              </div>
            </div>
          </div>

          <CircularProgress
            color="neutral"
            determinate
            variant="solid"
            size="lg"
            value={(item.value / item.goal) * 100}
          >
            <span className={styles.textInCircle}>
              {simplifyFraction(item.value, item.goal)[0] +
                ' / ' +
                simplifyFraction(item.value, item.goal)[1]}
            </span>
          </CircularProgress>

          <button
            className={styles.showReportButton}
            onClick={() => {
              window.location.href = `/report/${item.name}`;
            }}
          >
            Show Report <AiOutlineEye />
          </button>
        </div>
      );
    })
}

    
  </div>;
}

export default Reports;

import React from "react";
import styles from "./diet.module.css";

import breakfastImg from "../../assets/breakfast_img.png";
import lunchImg from "../../assets/lunck_img.png";
import snackImg from "../../assets/snack_img.png";
import dinnerImg from "../../assets/dinner_img.png";
import DietChart from "../../components/dietChart/dietChart";

import { MdEdit } from "react-icons/md";


function Diet() {
 

  return (
    <>
      <div className={styles.dietPage}>
        <h1 className={styles.heading}>5 Course Meals</h1>
        <div className={styles.dietPlans}>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={breakfastImg} alt="" />
              <MdEdit size={25} className={styles.editBtn} />
            </div>

            <h2 className={styles.mealName}>Breakfast</h2>
            <p className={styles.foodItems}>Plain Rice, Roti, Moong Dal</p>
            <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span>
          </div>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={lunchImg} alt="" />
              <MdEdit size={25} className={styles.editBtn} />
            </div>

            <h2 className={styles.mealName}>Lunch</h2>
            <p className={styles.foodItems}>Plain Rice, Roti, Moong Dal</p>
            <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span>
          </div>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={snackImg} alt="" />
              <MdEdit size={25} className={styles.editBtn} />
            </div>

            <h2 className={styles.mealName}>Evening Snack</h2>
            <p className={styles.foodItems}>Plain Rice, Roti, Moong Dal</p>
            <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span>
          </div>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={dinnerImg} alt="" />
              <MdEdit size={25} className={styles.editBtn} />
            </div>

            <h2 className={styles.mealName}>Dinner</h2>
            <p className={styles.foodItems}>Plain Rice, Roti, Moong Dal</p>
            <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span>
          </div>
        </div>
        <div className={styles.calorieChart}>
          <p>sdfsdsdfdffsdafas</p>
          <DietChart/>
        </div>
      </div>
    </>
  );
}

export default Diet;

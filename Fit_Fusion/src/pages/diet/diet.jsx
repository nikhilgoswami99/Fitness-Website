import React, { useEffect, useState } from "react";
import styles from "./diet.module.css";

import breakfastImg from "../../assets/breakfast_img.png";
import lunchImg from "../../assets/lunck_img.png";
import snackImg from "../../assets/snack_img.png";
import dinnerImg from "../../assets/dinner_img.png";
import DietChart from "../../components/dietChart/dietChart";
import DietEdit from "../../components/dietEditPage/editPage";

import { MdEdit } from "react-icons/md";

function Diet() {
  let [edit, setEdit] = useState(false);
  let [planName, setPlanName] = useState("");
  const [meals, setMeals] = useState([]);

  let handleEdit = (e) => {
    const mealBox = e.target.closest(`.${styles.plan}`);
    const heading = mealBox?.querySelector("h2")?.innerText;
    setPlanName(heading);
    setEdit(true);
  };

useEffect(() => {
  const storedMeals = localStorage.getItem("meals");
  if (!storedMeals) {
    const sampleMeals = [
      {
        type: "Breakfast",
        date: "2025-10-29",
        items: [
          { name: "Oatmeal with Almond Milk", quantity: "1 bowl", time: "08:00 AM" },
          { name: "Banana Smoothie", quantity: "1 glass", time: "08:15 AM" },
        ],
      },
      {
        type: "Lunch",
        date: "2025-10-29",
        items: [
          { name: "Brown Rice with Mixed Veg Curry", quantity: "1 plate", time: "01:00 PM" },
          { name: "Cucumber Salad", quantity: "1 bowl", time: "01:15 PM" },
        ],
      },
      {
        type: "Snacks",
        date: "2025-10-29",
        items: [
          { name: "Sprout Chaat", quantity: "1 bowl", time: "04:30 PM" },
          { name: "Green Tea", quantity: "1 cup", time: "04:45 PM" },
        ],
      },
      {
        type: "Dinner",
        date: "2025-10-29",
        items: [
          { name: "Chapati with Paneer Bhurji", quantity: "2 chapatis", time: "08:00 PM" },
          { name: "Vegetable Soup", quantity: "1 bowl", time: "08:15 PM" },
        ],
      },
    ];
    localStorage.setItem("meals", JSON.stringify(sampleMeals));
    setMeals(sampleMeals);
  } else {
    setMeals(JSON.parse(storedMeals));
  }
}, []);


  const handleDeleteFoodItem = (mealType, mealDate, itemIndex) => {
    setMeals((prevMeals) => {
      const updatedMeals = prevMeals.map((meal) => {
        if (meal.type === mealType && meal.date === mealDate) {
          const updatedItems = meal.items.filter((_, i) => i !== itemIndex);
          return { ...meal, items: updatedItems };
        }
        return meal;
      });

      // Optionally remove meals with no items left
      return updatedMeals.filter((meal) => meal.items.length > 0);
    });
  };

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    console.log(meals);
  }, [meals]);

  return (
    <>
      <div className={styles.dietPage}>
        {edit && (
          <DietEdit
            handleEdit={setEdit}
            planName={planName}
            setMeals={setMeals}
          />
        )}
        <h1 className={styles.heading}>5 Course Meals</h1>
        <div className={styles.dietPlans}>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={breakfastImg} alt="" />
              <MdEdit
                onClick={handleEdit}
                size={25}
                className={styles.editBtn}
              />
            </div>

            <h2 className={styles.mealName}>Breakfast</h2>
            <p className={styles.foodItems}>
              {meals.length > 0
                ? meals
                    .filter((obj) => obj.type === "Breakfast")
                    .flatMap((obj) =>
                      obj.items.map((item, idx) => (
                        <div className={styles.menuItem} key={idx}>
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemDetails}>
                              {item.quantity && (
                                <span>Qty: {item.quantity}</span>
                              )}
                              {item.time && <span>⏰ {item.time}</span>}
                              {obj.date && <span>📅 {obj.date}</span>}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteFoodItem(obj.type, obj.date, idx)
                            }
                            className={styles.deleteMenuBtn}
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )
                : "No Items"}
            </p>

            {/* <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span> */}
          </div>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={lunchImg} alt="" />
              <MdEdit
                onClick={handleEdit}
                size={25}
                className={styles.editBtn}
              />
            </div>

            <h2 className={styles.mealName}>Lunch</h2>
            <p className={styles.foodItems}>
              {meals.length > 0
                ? meals
                    .filter((obj) => obj.type === "Lunch")
                    .flatMap((obj) =>
                      obj.items.map((item, idx) => (
                        <div className={styles.menuItem} key={idx}>
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemDetails}>
                              {item.quantity && (
                                <span>Qty: {item.quantity}</span>
                              )}
                              {item.time && <span>⏰ {item.time}</span>}
                              {obj.date && <span>📅 {obj.date}</span>}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteFoodItem(obj.type, obj.date, idx)
                            }
                            className={styles.deleteMenuBtn}
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )
                : "No Items"}
            </p>

            {/* <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span> */}
          </div>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={snackImg} alt="" />
              <MdEdit
                onClick={handleEdit}
                size={25}
                className={styles.editBtn}
              />
            </div>

            <h2 className={styles.mealName}>Snacks</h2>
            <p className={styles.foodItems}>
              {meals.length > 0
                ? meals
                    .filter((obj) => obj.type === "Snacks")
                    .flatMap((obj) =>
                      obj.items.map((item, idx) => (
                        <div className={styles.menuItem} key={idx}>
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemDetails}>
                              {item.quantity && (
                                <span>Qty: {item.quantity}</span>
                              )}
                              {item.time && <span>⏰ {item.time}</span>}
                              {obj.date && <span>📅 {obj.date}</span>}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteFoodItem(obj.type, obj.date, idx)
                            }
                            className={styles.deleteMenuBtn}
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )
                : "No Items"}
            </p>

            {/* <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span> */}
          </div>
          <div className={styles.plan}>
            <div>
              <img className={styles.planImages} src={dinnerImg} alt="" />
              <MdEdit
                onClick={handleEdit}
                size={25}
                className={styles.editBtn}
              />
            </div>

            <h2 className={styles.mealName}>Dinner</h2>
            <p className={styles.foodItems}>
  {meals.length > 0
    ? meals
        .filter((obj) => obj.type === "Dinner")
        .flatMap((obj) =>
          obj.items.map((item, idx) => (
            <div className={styles.menuItem} key={idx}>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDetails}>
                  {item.quantity && <span>Qty: {item.quantity}</span>}
                  {item.time && <span>⏰ {item.time}</span>}
                  {obj.date && <span>📅 {obj.date}</span>}
                </span>
              </div>
              <button
                onClick={() =>
                  handleDeleteFoodItem(obj.type, obj.date, idx)
                }
                className={styles.deleteMenuBtn}
              >
                ✕
              </button>
            </div>
          ))
        )
    : "No Items"}
</p>

            {/* <span className={styles.calories}>
              500 <span className={styles.units}>kcal</span>
            </span> */}
          </div>
        </div>
        {/* <div className={styles.calorieChart}>
          <DietChart />
        </div> */}
      </div>
    </>
  );
}

export default Diet;

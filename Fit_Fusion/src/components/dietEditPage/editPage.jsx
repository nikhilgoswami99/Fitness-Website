/*
  Component: AddDietMenu (Diet Edit)
  Purpose: UI for creating and editing a meal/menu for a specific plan.
  Props:
  - `planName` : string name of the meal (Breakfast/Lunch/etc.)
  - `setMeals(prev => ...)` : callback to update the parent `meals` array
  - `handleEdit(false)` : function to close the editor modal
  Notes:
  - Manages local `foodItem` and `menuItems` states and pushes new meals
    into parent `meals` using `setMeals`.
*/
import React, { useEffect, useState } from "react";
import styles from "./editPage.module.css";

const AddDietMenu = (props) => {
  const [foodItem, setFoodItem] = useState({
    name: "",
    quantity: 1,
    kcalPerUnit: 100,
  });

  const [menuItems, setMenuItems] = useState([]);

  const [selectedDate, setSelectedDate] = useState("2025-06-27");
  const [selectedTime, setSelectedTime] = useState("11:29");

  const handleAddFood = () => {
    if (foodItem.name.trim()) {
      setMenuItems([...menuItems, foodItem]);
      setFoodItem({
        name: "",
        quantity: 1,
        kcalPerUnit: 100,
      });
    }
  };

  // printing menuItems on console
  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  const handleCancel = () => {
    props.handleEdit(false);
  };

  const deleteMenuItem = (idx) => {
    setMenuItems((prev) => {
      let newArr = prev.filter((item, index) => {
        if (idx !== index) {
          return item;
        }
      });
      return newArr;
    });
  };


  const handleAddMenu = () => {
    const meal = {
      id: `${props.planName.toLowerCase()}-${selectedDate}`,
      type: props.planName,
      date: selectedDate,
      time: selectedTime,
      items: menuItems,
      totalKcal: 0, // You can calculate this later
    };

    props.setMeals((prev) => {
      const existingMeal = prev.find((obj) => obj.type === meal.type && obj.date === meal.date);

      console.log(existingMeal);
      

      if (existingMeal) {
        return prev.map((obj) => {
          if (obj.type === meal.type && obj.date === meal.date) {
            return {...obj, items : [...obj.items, ...meal.items]};
          }
          return obj;
        });
      } else {
        return [...prev, meal];
      }
    });

    props.handleEdit(false);
  };

  const recommendedKcal = 440;

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Add {`${props.planName}`} Menu</h2>

        <label className={styles.label}>Select Menu</label>
        <div className={styles.foodInputContainer}>
          <input
            type="text"
            value={foodItem.name}
            onChange={(e) =>
              setFoodItem((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
            placeholder="Enter food item"
            className={styles.input}
          />
          <button onClick={handleAddFood} className={styles.addButton}>
            Add
          </button>
        </div>

        <div className={styles.menuDisplay}>
          {menuItems.map((item, index) => (
            <span key={index} className={styles.menuItem}>
              {item.name}
              <button
                className={styles.deleteMenuBtn}
                onClick={() => deleteMenuItem(index)}
              >
                X
              </button>
            </span>
          ))}
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Quantity</label>
          <div className={styles.quantityControl}>
            <button
              onClick={() =>
                setFoodItem((prev) => ({
                  ...prev,
                  quantity: Math.max(1, prev.quantity - 1), // prevent going below 1
                }))
              }
            >
              −
            </button>

            <span>{foodItem.quantity}</span>

            <button
              onClick={() =>
                setFoodItem((prev) => ({
                  ...prev,
                  quantity: prev.quantity + 1,
                }))
              }
            >
              +
            </button>
          </div>
        </div>

        {/* <div className={styles.row}>
          <div className={styles.label}>
            Total kcal: <strong>{foodItem.kcalPerUnit} kcal</strong>
          </div>
          <div className={styles.label}>
            Recommended kcal: <strong>{recommendedKcal} kcal</strong>
          </div>
        </div> */}

        <div className={styles.row}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Time</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleAddMenu} className={styles.addMenuButton}>
            Add Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDietMenu;

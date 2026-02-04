import React, { useState } from 'react';
import styles from './sidebar.module.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { MdOutlineRestaurantMenu, MdOutlineListAlt, MdOutlineExplore, MdMenu, MdClose } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector((state) => state.profile);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Loading state
  if (!data?.profile) {
    return (
      <>
        {/* Mobile Hamburger (Visible only on mobile via CSS) */}
        <button className={styles.hamburger} onClick={toggleSidebar}>
          <MdMenu size={28} />
        </button>
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
           {/* Close Button (Visible only on mobile via CSS) */}
           <button className={styles.closeBtn} onClick={closeSidebar}>
            <MdClose size={28} />
          </button>
          <div className={styles.loadingContainer}>
            <p>Loading Profile...</p>
          </div>
        </div>
        {/* Overlay */}
        <div 
          className={`${styles.overlay} ${isOpen ? styles.showOverlay : ''}`} 
          onClick={closeSidebar}
        />
      </>
    );
  }

  // console.log(data); // Optional: removed purely for cleanliness, can keep if needed

  return (
    <>
      {/* Mobile Hamburger */}
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <MdMenu size={28} />
      </button>

      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.showOverlay : ''}`} 
        onClick={closeSidebar}
      />

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={closeSidebar}>
          <MdClose size={28} />
        </button>

        <div className={styles.myCardWrapper}>
          <div className={styles.myCardProfile}>
            <img
              src={data.profile.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              alt="User Profile"
              className={styles.myCardImage}
            />
            <div>
              <h2 className={styles.myCardName}>{data.profile.name}</h2>
              <p className={styles.myCardSubtitle}>{data.profile.age} Years Athlete</p>
            </div>
          </div>
          <div className={styles.myCardStats}>
            <div className={styles.myCardStat}>
              <p className={styles.myCardWeightLabel}>Weight</p>
              <p className={styles.myCardValue}>{data.profile.weight} kg</p>
            </div>
            <div className={styles.myCardStat}>
              <p className={styles.myCardHeightLabel}>Height</p>
              <p className={styles.myCardValue}>{data.profile.height} cm</p>
            </div>
            <div className={styles.myCardStat}>
              <p className={styles.myCardGoalLabel}>Goal</p>
              <p className={styles.myCardValue}>{data.profile.goalWeight} kg</p>
            </div>
          </div>
        </div>

        <div className={styles.sidebarNav}>
          <NavLink 
            to="/profile" 
            onClick={closeSidebar}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
          >
            <CgProfile size={24} />
            Profile
          </NavLink>
          <NavLink 
            to="/diet" 
            onClick={closeSidebar}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
          >
            <MdOutlineRestaurantMenu size={24} />
            Diet
          </NavLink>
          <NavLink 
            to="/savedWorkouts" 
            onClick={closeSidebar}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
          >
            <MdOutlineListAlt size={24} />
            My Workout Plans
          </NavLink>
          <NavLink 
            to="/" 
            end
            onClick={closeSidebar}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
          >
            <MdOutlineExplore size={24} />
            Exercise Explore
          </NavLink>
        </div>

        <p className={styles.copyright}>© 2025 FitFreak. All rights reserved.</p>
      </div>
    </>
  );
};

export default Sidebar;

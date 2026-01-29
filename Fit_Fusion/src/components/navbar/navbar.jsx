/*
  Component: Navbar
  Purpose: Top navigation bar with links to main app sections.
  Key points:
  - Uses `NavLink` to apply active styling.
  - Shows different links based on user login status.
  - Profile, Diet, Saved Workouts only visible when logged in.
  - Sign In and Register buttons only visible when logged out.
*/
import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";

function Navbar() {
  // Get user authentication status from context
  const { isAuthenticated, isLoading } = useUser();

  return (
    <nav className={styles.navbar}>
      <img className={styles.navbarImage} src={logo} alt="navbarLogo" />
      
      <ul className={styles.navLinks}>
        {/* Home link - Always visible */}
        <NavLink
          className={({ isActive }) => `${styles.links} ${isActive ? styles.bgColor : styles.link}`}
          to={"/"}
        >
          Home
        </NavLink>

        {/* Diet link - Only visible when logged in */}
        {isAuthenticated && (
          <NavLink
            className={({ isActive }) => `${styles.links} ${isActive ? styles.bgColor : styles.link}`}
            to={"diet"}
          >
            Diet
          </NavLink>
        )}

        {/* Profile link - Only visible when logged in */}
        {isAuthenticated && (
          <NavLink
            className={({ isActive }) => `${styles.links} ${isActive ? styles.bgColor : styles.link}`}
            to={"profile"}
          >
            Profile
          </NavLink>
        )}

        {/* Sign In button - Only visible when NOT logged in */}
        {!isAuthenticated && !isLoading && (
          <NavLink
            className={({ isActive }) => `${styles.links} ${isActive ? styles.bgColor : styles.link}`}
            to={"/login"}
          >
            Sign In
          </NavLink>
        )}

        {/* Register button - Only visible when NOT logged in */}
        {!isAuthenticated && !isLoading && (
          <NavLink
            className={({ isActive }) => `${styles.links} ${isActive ? styles.bgColor : styles.link}`}
            to={"/register"}
          >
            Register
          </NavLink>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

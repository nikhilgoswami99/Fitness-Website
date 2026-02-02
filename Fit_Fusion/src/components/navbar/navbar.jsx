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
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { logoutUser } from "../../services/appwrite";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  // Get user authentication status from context
  const { isAuthenticated, isLoading, clearUser } = useUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Failed to logout");
    }
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logoLink}>
        <img className={styles.navbarImage} src={logo} alt="navbarLogo" />
      </NavLink>
      
      <ul className={styles.navLinks}>
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

        {/* Logout button - Only visible when logged in */}
        {isAuthenticated && (
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
            <MdLogout size={20} />
          </button>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

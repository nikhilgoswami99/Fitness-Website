import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img className={styles.navbarImage} src={logo} alt="navbarLogo" />
      <ul className={styles.navLinks}>
        <NavLink
          className={({ isActive }) =>`${styles.links}
            ${isActive ? styles.bgColor : styles.link}`
          }
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>`${styles.links}
            ${isActive ? styles.bgColor : styles.link}`
          }
          to={"diet"}
        >
          Diet
        </NavLink>
        <NavLink
          className={({ isActive }) =>`${styles.links}
            ${isActive ? styles.bgColor : styles.link}`
          }
          to={"profile"}
        >
          Profile
        </NavLink>
      </ul>
      {/* <button className={styles.signOut}>Sign Out</button> */}
    </nav>
  );
}

export default Navbar;

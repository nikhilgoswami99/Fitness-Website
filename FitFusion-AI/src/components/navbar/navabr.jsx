import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./navbar.module.css";

function Navabr() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1 className={styles.logoText}>Fit Fusion AI</h1>
          </div>

          <div className={styles.menuToggle} onClick={toggleMenu}>
            <div
              className={`${styles.menuBar} ${isMenuOpen ? styles.active : ""}`}
            ></div>
            <div
              className={`${styles.menuBar} ${isMenuOpen ? styles.active : ""}`}
            ></div>
            <div
              className={`${styles.menuBar} ${isMenuOpen ? styles.active : ""}`}
            ></div>
          </div>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/about" className={styles.navLink}>
                  About
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/services" className={styles.navLink}>
                  Services
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/contact" className={styles.navLink}>
                  Contact
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/ai-trainer" className={styles.navLink}>
                  AI Trainer
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/signUp"
                  className={`${styles.navLink} ${styles.navLinkHighlight}`}
                >
                  Register
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/signIn"
                  className={`${styles.navLink} ${styles.navLinkHighlight}`}
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navabr;

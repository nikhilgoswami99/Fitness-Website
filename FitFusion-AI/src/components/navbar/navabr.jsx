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
                <a href="/" className={styles.navLink}>
                  Home
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/about" className={styles.navLink}>
                  About
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/services" className={styles.navLink}>
                  Services
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/contact" className={styles.navLink}>
                  Contact
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/ai-trainer" className={styles.navLink}>
                  AI Trainer
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="/login"
                  className={`${styles.navLink} ${styles.navLinkHighlight}`}
                >
                  Register/Sign In
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navabr;

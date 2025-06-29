import styles from './navbar.module.css'
import logo from '../../assets/logo.png'

import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img className={styles.navbarImage} src={logo} alt="navbarLogo" />
      <ul className={styles.navLinks}>
        <Link className={styles.links} to={'/'}>Home</Link>
        <Link className={styles.links} to={'diet'}>Diet</Link>
        <li className={styles.links}>Profile</li>
      </ul>
      <button className={styles.signOut}>Sign Out</button>
    </nav>
  )
}

export default Navbar

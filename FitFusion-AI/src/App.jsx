import styles from './App.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/navabr'
import Footer from './components/footer/footer'

function App() {


  return (
    <>
    <Navbar></Navbar>
    <div className={styles.outlet}>
    <Outlet></Outlet>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App

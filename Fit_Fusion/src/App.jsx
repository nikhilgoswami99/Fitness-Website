/*
  Component: App
  Purpose: Root layout component that renders the global `Navbar`
           and a `react-router` `Outlet` where child routes mount.
  Notes:
  - Keep this component minimal; layout-only responsibilities.
  - ToastContainer added for global notifications.
*/
import styles from './App.module.css'
import {Outlet} from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from './context/userContext';
import { setProfile } from './redux/profileSlice';

function App() {
  const { user, isLoading, isAuthenticated } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setProfile(user));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.appContainer}>
      <Navbar/>
      <div className={styles.mainBody}>
        {isAuthenticated && <Sidebar/>}
        <div className={styles.contentArea}>
          <Outlet/>
        </div>
        
      </div>
      
      {/* Toast Container for notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App

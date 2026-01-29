/*
  Component: App
  Purpose: Root layout component that renders the global `Navbar`
           and a `react-router` `Outlet` where child routes mount.
  Notes:
  - Keep this component minimal; layout-only responsibilities.
  - ToastContainer added for global notifications.
*/
import './App.css'
import {Outlet} from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from './context/userContext';
import { setProfile } from './redux/profileSlice';

function App() {
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setProfile(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <Navbar/>
      <Outlet/>
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
    </>
  )
}

export default App

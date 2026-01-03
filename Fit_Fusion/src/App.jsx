/*
  Component: App
  Purpose: Root layout component that renders the global `Navbar`
           and a `react-router` `Outlet` where child routes mount.
  Notes:
  - Keep this component minimal; layout-only responsibilities.
*/
import './App.css'
import {Outlet} from 'react-router-dom'
import Navbar from './components/navbar/navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App

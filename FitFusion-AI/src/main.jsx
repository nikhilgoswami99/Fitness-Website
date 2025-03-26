import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Home from './pages/home/home.jsx'
import About from './pages/about/about.jsx'
import Services from './pages/services/services.jsx'
import SignIn from './pages/signIn/signIn.jsx'
import SignUp from './pages/signUp/signUp.jsx'


const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/services',
            element: <Services/>
        }
      ]
    },
    {
        path: '/signIn',
        element: <SignIn/>
    },
    {
        path: '/signUp',
        element: <SignUp/>
    }
  ]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

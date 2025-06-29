import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/home/home.jsx';
import Diet from './pages/diet/diet.jsx';


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
            path: 'diet',
            element: <Diet/>
        },
      ]
    },
  ]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

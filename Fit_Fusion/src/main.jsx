import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [
        {
            path: '/',
            // element: <Home/>
        },
      ]
    },
  ]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

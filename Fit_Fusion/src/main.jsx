/*
  Entry: main.jsx
  Purpose: App entry point that bootstraps React, provides the Redux
           store and sets up client-side routes using `react-router`.
  Notes:
  - Routes are defined here and mount under the `App` layout.
*/
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Diet from "./pages/diet/diet.jsx";
import Profile from "./pages/profile/profile.jsx";
import Workouts from "./pages/workouts/workouts.jsx";
import SavedWorkouts from "./pages/savedWorkouts/savedWorkouts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "diet",
        element: <Diet />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "workouts/:workoutType",
        element: <Workouts />,
      },
      {
        path: "savedWorkouts",
        element: <SavedWorkouts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

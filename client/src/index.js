import styles from "./index.css" // This is for tailwindcss

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App.js";
import Friends from "./pages/Friends.js";
import Signup from "./pages/Signup";
import Meetings from "./pages/Meetings.js";
import Activity from "./pages/Activity.js";

//ErrorPage

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component with NavBar and Outlet
    // errorElement: <ErrorPage />, // Uncomment if ErrorPage is implemented
    children: [
      { path:"friends", element: <Friends />},
      { path: "activities", element: <Activity /> },
      { path: "meetings", element: <Meetings /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
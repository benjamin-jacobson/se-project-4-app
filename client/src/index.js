// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./components/App";

// ReactDOM.render(<App />, document.getElementById("root"));


// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App.js";
import Home from "./pages/Home";
import Friends from "./pages/Friends.js";
import About from "./pages/About";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoAccess from "./pages/NoAccess.js";
import Meetings from "./pages/Meetings.js";
//ErrorPage

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component with NavBar and Outlet
    // errorElement: <ErrorPage />, // Uncomment if ErrorPage is implemented
    children: [
      { path: "home", element: <Home /> },
      { path:"friends", element: <Friends />},
      { path: "about", element: <About /> },
      // { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "meetings", element: <Meetings /> },
      { path: "noaccess", element: <NoAccess /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
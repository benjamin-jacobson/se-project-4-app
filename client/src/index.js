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
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/signup",
      element: <Signup />
      },
    // {
    //   path: "/",
    //   element: <Home />
    // },
    {
        path: "/about",
        element: <About />
    },
    {
    path: "/login",
    element: <Login />
    },

  ]);

  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
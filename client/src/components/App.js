import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from '../pages/Home'
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LoginSignup from "../pages/LoginSignup.js"

function App() {
  const [user, setUser] = useState(false); //useState(null);

  return(
  <main>
  {user ? (<Home />) : (<LoginSignup />)}
  </main>
  )
}

export default App;



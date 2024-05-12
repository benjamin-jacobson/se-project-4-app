import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from '../pages/Home'
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LoginSignup from "../pages/LoginSignup.js"

function App() {
  const [user, setUser] = useState(null); //useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {r.json().then((user) => setUser(user));
      } else if (r.status === 204) {setUser(null);}
    });
  }, []);  // need to fix the issues occuring on the promise and the endpoint. Not sure what it is.

  console.log(user)
  
  return(
  <main>
  {user ? (<Home />) : (<LoginSignup />)}
  </main>
  )
}

export default App;
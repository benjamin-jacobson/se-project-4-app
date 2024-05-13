import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from '../pages/Home'
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LoginSignup from "../pages/LoginSignup.js"

function App() {
  const [user, setUser] = useState(null); //useState(null);

  function handleLogin(user) {setUser(user);} // TODO edits HERE !!!!!!

  function handleLogout() {setUser(null);}

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {r.json().then((user) => setUser(user));
      } else if (r.status === 204) {setUser(null);}
    });
  }, []);
  
  return(
  <main>
  {user ? (<Home handleLogout={handleLogout}/>) : (<LoginSignup setUser={setUser} />)}
  </main>
  )
}

export default App;
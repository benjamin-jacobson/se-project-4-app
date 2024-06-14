import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";

import Home from '../pages/Home'
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LoginSignup from "../pages/LoginSignup.js"
import Header from "../components/Header";


function App() {
  const [user, setUser] = useState(null); //useState(null);

  function handleLogin(user) {setUser(user);} // TODO edits HERE !!!!!!

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {r.json().then((user) => setUser(user));
      } else if (r.status === 204) {setUser(null);}
    });
  }, []); // TODO does this need to run every time the APP loads, or just certain pages?

  function handleLogout() {setUser(null);} // also redirect
  // function handleLogout() {console.log("iraaaefasabennnnn");}
  
  return(
  <main >
    
  {user ? (<>
          <Header handleLogout={handleLogout}/>
          <Outlet />
          {/* <Home handleLogout={handleLogout} user={user}/> */}
          </>) 
  : (<LoginSignup setUser={setUser} />)}
  </main>
  )
}

export default App;
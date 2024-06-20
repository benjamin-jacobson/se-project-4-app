import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";

// import Home from '../pages/Home'
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LoginSignup from "../pages/LoginSignup.js"
import Header from "../components/Header";

export const Cont = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(user) {setUser(user);}

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {r.json().then((user) => setUser(user));
      } else if (r.status === 204) {setUser(null);}
    });
  }, []);

  function handleLogout() {setUser(null);} // also redirect
  
  return(
    <main >
      {user ? (<>
              <Cont.Provider value={user}>
              <Header handleLogout={handleLogout}/>
              </Cont.Provider>
              <Outlet />
              </>) 
      : (<LoginSignup setUser={setUser} />)}
    </main>
  )
}

export default App;
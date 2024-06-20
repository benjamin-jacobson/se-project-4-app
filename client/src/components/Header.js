import React from 'react';
import NavBar from './NavBar';
import Logout from './Logout';
import { Cont } from "./App";
import { useContext } from "react";

function Header({handleLogout}) {
  const user = useContext(Cont)
  return (
    <header className="header">
      <NavBar handleLogout={handleLogout} />
      <h4 class="text-stone-300">Welcome {user.username}!!</h4>
    </header>
  )

}

export default Header;
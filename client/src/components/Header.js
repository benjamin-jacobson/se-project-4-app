import React from 'react';
import NavBar from './NavBar';
import Logout from './Logout';
import { Outlet } from 'react-router-dom';

function Header({handleLogout}) {
  // function handleLogoooooout () {
  //   console.log("blahhhhhh")
  // }
  
  return (
    <header>
      <NavBar />
      <Outlet />
      <Logout handleLogout={handleLogout} />
    </header>
  )

}

export default Header;
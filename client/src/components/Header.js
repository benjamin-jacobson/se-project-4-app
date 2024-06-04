import React from 'react';
import NavBar from './NavBar';
import Logout from './Logout';

function Header({handleLogout}) {
  // function handleLogoooooout () {
  //   console.log("blahhhhhh")
  // }
  
  return (
    <header>
      <NavBar />
      <Logout handleLogout={handleLogout} />
    </header>
  )

}

export default Header;
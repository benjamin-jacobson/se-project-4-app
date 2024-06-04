import React from 'react';
import NavBar from './NavBar';
import Logout from './Logout';

function Header({handleLogout}) {
  
  return (
    <header>
      <NavBar />
      <Logout handleLogout={handleLogout} />
    </header>
  )

}

export default Header;
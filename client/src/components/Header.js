import React from 'react';
import NavBar from './NavBar';
import Logout from './Logout';

function Header({handleLogout}) {
  
  return (
    <header className="header">
      <NavBar handleLogout={handleLogout} />
    </header>
  )

}

export default Header;
import React from 'react';
import NavBar from './NavBar';
import Logout from './Logout';

function Header({handleLogout}) {
  
  return (
    // <header className="bg-blue-500 p-4 text-white">
    <header className="header">
      <NavBar handleLogout={handleLogout} />
      {/* <Logout handleLogout={handleLogout} /> */}
    </header>
  )

}

export default Header;
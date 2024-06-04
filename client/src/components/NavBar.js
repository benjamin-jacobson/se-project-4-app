import { NavLink } from "react-router-dom";


function NavBar() {

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/about"> About</NavLink>
      <NavLink to="/login"> Login</NavLink>
      <NavLink to="/noaccess"> NoAccess</NavLink>
    </nav>
  )
}
  
export default NavBar;
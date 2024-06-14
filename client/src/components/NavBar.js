import { NavLink } from "react-router-dom";

function NavBar() {

  return (
    <div>
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/friends"> Friends</NavLink>
      <NavLink to="/about"> About</NavLink>
      {/* <NavLink to="/login"> Login</NavLink> */}
      <NavLink to="/meetings"> Meetings</NavLink>
      {/* <NavLink to="/noaccess"> NoAccess</NavLink> */}
    </nav>
  </div>
  )
}
  
export default NavBar;
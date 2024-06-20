import { NavLink } from "react-router-dom";
import Logout from "./Logout";


function NavBar({handleLogout}) {

  return (
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-teal-400 p-6">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <span class="font-semibold text-xl tracking-tight">WenFren</span>
          </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
           <div class="lg:flex-grow">
              <NavLink className="text-white hover:underline" to="/friends"> Friends</NavLink>
              <NavLink className="text-white hover:underline" to="/meetings"> Meetings</NavLink>
              <NavLink className="text-white hover:underline" to="/activities"> Activities</NavLink>
              <NavLink className="text-white hover:underline" to="/frenbot"> Frenbot</NavLink>
              </div>
              <Logout handleLogout={handleLogout} />
              </div>
              
      </nav>
  </div>
  )
}
  
export default NavBar;

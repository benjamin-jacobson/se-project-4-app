import NavBar from "../components/NavBar";
import Header from "../components/Header";
import AddFriendMeeting from "../components/AddFriendMeeting";
import NewMeetup from "../components/NewMeetup";

import { useState, useEffect } from "react";

function Meetings(){
  return (
    <NewMeetup />
  )
}

export default Meetings;


// function Meetings() {

//   const [dropdownDataFriends, setDropdownDataFriends] = useState([])
//   const [selectedFriendId, setSelectedFriendId] = useState('');
  
//   // Handle change event
//   const handleChange = (event) => {
//     setSelectedFriendId(event.target.value);
//   };

//   useEffect(() =>{
//     fetch("/friends")
//       .then(r => r.json())
//       .then(data => setDropdownDataFriends(data))
//       .catch(error => console.error(error))
//   }, [])
//   console.log(dropdownDataFriends)

//   return (
//     <>
//       <main>
//         <h1>This is Meeting component.</h1>
//         <div className="App">
//       <h1>Select a friend</h1>
//       <select value={selectedFriendId} onChange={handleChange}>
//         <option value="" disabled>Select an option</option>
//         {dropdownDataFriends.map((option) => (
//           <option key={option.id} value={option.id}>
//             {option.name}
//           </option>
//         ))}
//       </select>
//       <p>Selected Friend: {selectedFriendId}</p>
//     </div>
//         <h1>Enter the meeting details.</h1>
//         <AddFriendMeeting />
//       </main>
//     </>
//   )


// };


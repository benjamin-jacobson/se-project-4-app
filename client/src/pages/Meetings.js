import NavBar from "../components/NavBar";
import Header from "../components/Header";
import AddFriendMeeting from "../components/AddFriendMeeting";
import NewMeetup from "../components/NewMeetup";
import MeetingCard from "../components/MeetingCard";

import { useState, useEffect } from "react";

function Meetings(){

  const [friends, setFriends] = useState([]) // Need to fix which state is being used and how to update meetings

    function handleAddMeeting(obj) {
      if (!obj || !obj.friend_id) {
        console.error('Invalid input object or friend_id is missing.');
        return;
      }
    
      // Create a new array of friends with the updated meetings list
      const updatedFriends = friends.map(friend => {
        if (friend.id === obj.friend_id) {

          // Create a new meeting object to add to state
          const newMeeting = {
            activity_id: obj.activity_id,
            date: obj.date,
            friend_id: obj.friend_id,
            id: friend.meetings.length + 1
          };
  
          // Updating meetings array
          return {...friend,meetings: [...friend.meetings, newMeeting]};
        } else {return friend; // Return the original friend object if no update is needed
        }
      });
      setFriends(updatedFriends); // Example of how you might update state in React
    }

  // // Function to delete meetings by ID
  const handleDeleteMeeting = (idToDelete) => {
    const updatedFriends = friends.map(friend => {
      return {
        ...friend,
        meetings: friend.meetings.filter(meeting => meeting.id !== idToDelete)
      };
    });
    setFriends(updatedFriends); // MAKE SURE THIS IS THE RIGHT FRIEND! NOT ALL OF THEM
  };


  useEffect(() =>{
    fetch("/friends")
      .then(r => r.json())
      .then(data => setFriends(data))
      .catch(error => console.error(error))
  }, [])

  console.log("allmeetings")
  console.log(friends)
  console.log("allmeetings")
  const meetingInformationDisplayArray = friends.map(
    f => {
    return <MeetingCard name={f.name} user_id={f.user_id} meetings={f.meetings} handleDeleteMeeting={handleDeleteMeeting}/>
  });


  return (
    <>
    <div class="flex">
    <div class="split w-1/2 ">
      <div class="centered">
      <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">Create meetups with yo fren!</h1>
      {/* <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <span class=" font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Add new meetups</span> */}
        <NewMeetup handleAddMeeting={handleAddMeeting} />
      </div>
    </div>

    <div class="split w-1/2 bg-gray-300">
      <div class="centered">
      <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">My meetups!</h1>
        <h2 class="text-xl font-bold mb-2">John Doe</h2>
        <p>Meetings on the books.</p>
        <ul>{meetingInformationDisplayArray}</ul>
      </div>
    </div>
  </div>
    </>
  )
}

export default Meetings;
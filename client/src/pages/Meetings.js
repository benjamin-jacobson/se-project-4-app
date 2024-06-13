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
    <NewMeetup handleAddMeeting={handleAddMeeting} />
    <h1>Meetings on the books</h1>
    {meetingInformationDisplayArray}
    </>
  )
}

export default Meetings;
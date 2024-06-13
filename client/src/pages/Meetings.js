import NavBar from "../components/NavBar";
import Header from "../components/Header";
import AddFriendMeeting from "../components/AddFriendMeeting";
import NewMeetup from "../components/NewMeetup";
import MeetingCard from "../components/MeetingCard";

import { useState, useEffect } from "react";

function Meetings(){

  const [friends, setFriends] = useState([]) // Need to fix which state is being used and how to update meetings
  // const [allMeetings, setAllMeetings] = useState([])

  const handleAddMeeting = () => {console.log("write me to add!")}

  // const handleAddMeeting = (friendName, newMeeting) => { // not sure how to do this
  //   const updatedFriends = friends.map(friend => {
  //     if (friend.name === friendName) {
  //       return {
  //         ...friend,
  //         meetings: [...friend.meetings, newMeeting]
  //       };
  //     }
  //     return friend;
  //   });
  //   setFriends(updatedFriends);

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
  const userList = friends.map(
    f => {
    return <MeetingCard name={f.name} user_id={f.user_id} meetings={f.meetings} handleDeleteMeeting={handleDeleteMeeting} handleAddMeeting={handleAddMeeting}/>
  });


  return (
    <>
    <NewMeetup />
    <h1>Meetings on the books</h1>
    {userList}
    </>
  )
}

export default Meetings;
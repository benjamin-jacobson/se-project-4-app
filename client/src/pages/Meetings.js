import NavBar from "../components/NavBar";
import Header from "../components/Header";
import AddFriendMeeting from "../components/AddFriendMeeting";
import NewMeetup from "../components/NewMeetup";
import MeetingCard from "../components/MeetingCard";

import { useState, useEffect } from "react";

function Meetings(){

  const [allMeetings, setAllMeetings] = useState([])

  useEffect(() =>{
    fetch("/friends")
      .then(r => r.json())
      .then(data => setAllMeetings(data))
      .catch(error => console.error(error))
  }, [])

  console.log("allmeetings")
  console.log(allMeetings)
  console.log("allmeetings")
  const userList = allMeetings.map(
    f => {
    return <MeetingCard name={f.name} user_id={f.user_id} meetings={f.meetings}/>
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
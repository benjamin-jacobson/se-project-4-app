import NavBar from "../components/NavBar";
import Header from "../components/Header";
import FriendCard from "../components/FriendCard";
import { useState, useEffect } from "react";

function Friends() {

  const [friends, setFriends] = useState([])

  useEffect(() =>{
    fetch("/friends")
      .then(r => r.json())
      .then(data => setFriends(data))
      .catch(error => console.error(error))
  }, [])

  const friendList = friends.map(
    f => {
    return <FriendCard key={f.name}/>
  });

  return (
    <>
      <main>
        <h1>This is frieds component.</h1>
        {friendList}
      </main>
    </>
  )

};

export default Friends;
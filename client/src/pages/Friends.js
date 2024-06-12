import NavBar from "../components/NavBar";
import Header from "../components/Header";
import FriendCard from "../components/FriendCard";
import NewFriendForm from "../components/NewFriendForm";
import Search from "../components/SearchFriends";
import UpdateFriend from "../components/UpdateFriend";
import { useState, useEffect } from "react";

function Friends() {

  const [friends, setFriends] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() =>{
    fetch("/friends")
      .then(r => r.json())
      .then(data => setFriends(data))
      .catch(error => console.error(error))
  }, [])

  const handleAddFriend = (addFriend) => {
    const updatedFriendsArray = [...friends, addFriend];
    setFriends(updatedFriendsArray);
  }

  const handleDeleteFriend = (id) => {
    const updatedFriendsArray = friends.filter((fren) => fren.id !== id);
    setFriends(updatedFriendsArray);
  }

  const handleUpdateFren = (updatedFriend) => {
    const updatedFriendssArray = friends.map(fren => {
      if (fren.id === updatedFriend.id) return updatedFriend
      else return fren;  
    });
    setFriends(updatedFriendssArray);
  }

  const displayedFrens = friends.filter((fren) =>
  fren.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const arrayDataItems = displayedFrens.map((fren) => (
    <li key={fren.id}>
      <FriendCard friend={fren} onDeleteFriend={handleDeleteFriend} />
    </li> ))

  return (
    <>
      <main>
        <h1>This is frieds component.</h1>
        <NewFriendForm onAddFriend={handleAddFriend} onDeleteFriend={handleDeleteFriend} />
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
        <UpdateFriend handleUpdateFren={handleUpdateFren} friends={friends}/>
        <ul>{arrayDataItems}</ul>
      </main>
    </>
  )

};

export default Friends;
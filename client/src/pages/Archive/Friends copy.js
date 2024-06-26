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
    const updatedFriendsArray = friends.map(fren => {
      if (fren.id === parseInt(updatedFriend.id)) {
        const updatedFren = { ...fren, ...updatedFriend }; // only updates keys that changed
        return updatedFren;
      } else {
        return fren;  
      }
    });
    setFriends(updatedFriendsArray);
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

      
      <main  class="max-w-sm mx-auto">
        <br></br>
        <h1 class="text-teal-300 text-xl">Add, edit or delete your fren content here!</h1>
        <br></br>
        <NewFriendForm onAddFriend={handleAddFriend} onDeleteFriend={handleDeleteFriend} />
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
        <UpdateFriend handleUpdateFren={handleUpdateFren} friends={friends}/>
        <ul>{arrayDataItems}</ul>
      </main>
    </>
  )

};

export default Friends;
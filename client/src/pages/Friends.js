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
      <br></br>
    </li> ))

  return (
    <>
    <div class="flex">
    <div class="split w-1/2 ">
      <div class="centered">
      <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">Create, edit, remove yo fren!</h1>
      <h2 class="centered max-w-sm mx-auto font-medium text-slate-300">Add new fren</h2>
        <NewFriendForm onAddFriend={handleAddFriend} onDeleteFriend={handleDeleteFriend} />
        <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <h2 class=" centered max-w-sm mx-auto font-medium text-slate-300">Update yo fren</h2>
        <UpdateFriend handleUpdateFren={handleUpdateFren} friends={friends}/>
      </div>
    </div>

    <div class="split w-1/2 ">
      <div class="centered">
      <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">My frens: search and delete!</h1>
      <h2 class=" centered max-w-sm mx-auto font-medium text-slate-300">Search fren</h2>

      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
      <br></br>
    
        <div class="max-w-sm mx-auto">
        <ul>{arrayDataItems}</ul>
        </div>
      </div>
    </div>
  </div>
    </>
  )

};

export default Friends;
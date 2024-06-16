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
      <span class=" font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Add new fren</span>
        <NewFriendForm onAddFriend={handleAddFriend} onDeleteFriend={handleDeleteFriend} />
        <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        {/* <span class=" font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Search fren</span>

        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
        <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr> */}
        <span class=" font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Update yo fren</span>
        <UpdateFriend handleUpdateFren={handleUpdateFren} friends={friends}/>
      </div>
    </div>
    <div class=" inset-y-0 left-1/2 w-0.5 bg-blue-500 opacity-30 divide-dotted"></div>

    <div class="split w-1/2 ">
      <div class="centered">
      <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">My frens: search and delete!</h1>
      <span class=" font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Search fren</span>

      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
      <br></br>
      {/* <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr> */}
    
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
import { useState, useEffect } from "react"
import UserCard from "../components/UserCard";
import Header from "../components/Header";

function Home({user, handleLogout}) {

  const [allUsers, setAllUsers] = useState([])
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() =>{
    fetch("/users")
      .then(r => r.json())
      .then(data => setAllUsers(data))
      .catch(error => console.error(error))
  }, [])

  console.log(allUsers)

  // const result = allUsers.find(obj => obj.id === session.get('user_id');


  const userList = allUsers.map(
    user => {
    return <UserCard key={user.id} user={user} />
  });

  return (
    <>
      <main >
        <h1 className="text-center text-green-500 font-bold">Home Page - My Friends!</h1>
        
        <h1> My Meetings</h1>
        <h1>Users</h1>
        {userList}
      </main>
    </>
  )
}

export default Home;
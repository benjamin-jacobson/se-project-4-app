import { useState, useEffect } from "react"
import UserCard from "../components/UserCard";
import Header from "../components/Header";

function Home({user, handleLogout}) {
  console.log("I ran 1")
  console.log(handleLogout); // Should log the function
  console.log("I ran 2")
  const [allUsers, setAllUsers] = useState([])

  // function handleLogoooooout () {
  //   console.log("blahhhhhh")
  // }

  useEffect(() =>{
    fetch("/users")
      .then(r => r.json())
      .then(data => setAllUsers(data))
      .catch(error => console.error(error))
  }, [])

  const userList = allUsers.map(
    user => {
    return <UserCard key={user.id} user={user} />
  });


  return (
    <>
      {/* <Header handleLogout={handleLogoooooout}/> */}
      <main>
        <h1>Home Page!</h1>
        {userList}
      </main>
    </>
  )
}

export default Home;
import { useState, useEffect } from "react"
import UserCard from "../components/UserCard";
// import NavBar from "../components/NavBar";
import Header from "../components/Headers";
function Home({handleLogout}) {

  const [users, setUsers] = useState([])

  useEffect(() =>{
    fetch("/users")
      .then(r => r.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }, [])

  const userList = users.map(
    user => {
    return <UserCard key={user.id} user={user} />
  });

  return (
    <>
      {/* <header>
        <NavBar />
      </header> */}
      <Header handleLogout= {handleLogout}/>
      <main>
        <h1>Home !</h1>
        {userList}
      </main>
    </>

  )


};

export default Home;


// function Home({ user }) {
//   if (user) {
//     return <h1>Welcome, {user.username}!</h1>;
//   } else {
//     return <h1>Please Login or Sign Up</h1>;
//   }
// }

// export default Home;
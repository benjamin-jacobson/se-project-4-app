import NavBar from "../components/NavBar";
import Header from "../components/Header";

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
    return <UserCard key={f.id} user={f} />
  });

  // NEED TO SET SEED FOR SOME FRIENDS!!!

  return (
    <>
      <main>
        <h1>This is frieds component.</h1>
      </main>
    </>
  )


};

export default Friends;



function Home({user, handleLogout}) {

  const [allUsers, setAllUsers] = useState([])

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
      <main>
        <h1>Home Page!</h1>
        {userList}
      </main>
    </>
  )
}

export default Home;
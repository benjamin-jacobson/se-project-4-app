function Logout({handleLogout}) {
  
  function enactLogout(){
    console.log("I was clicked")
    fetch("/logout",
    {method:"DELETE"})
    .then((r) => {
      if (!r.ok) {
          throw new Error('Network response was not ok');
      }
      return r.json();
  })
  .then((data) => {
    // Handle successful logout & redirect
    handleLogout() // setting user state var as null
    window.location.replace("/login");
    
      })
.catch((error) => {
    console.error('There was a problem with the logout request:', error);
      });
  }

  return (
    <button onClick={enactLogout}>Log Me Out</button>
  )
}
  
  export default Logout;
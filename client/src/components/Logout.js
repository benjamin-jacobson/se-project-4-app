function Logout({handleLogout}) {

  function enactLogout(){
    console.log("I was clicked");

    
    fetch("/logout",
    {method:"DELETE"})
    .then((r) => {
      if (!r.ok) {
          throw new Error('Network response was not ok');
      }
      //return r.json();
      handleLogout() // setting user state var as null
      window.location.replace("/"); // redirect home if logout //add a come back soon and another redirect
  })
.catch((error) => {console.error('There was a problem with the logout request:', error);
});
  }

  return (<button class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={enactLogout}>Log Me Out</button>
  )
}
  
  export default Logout;
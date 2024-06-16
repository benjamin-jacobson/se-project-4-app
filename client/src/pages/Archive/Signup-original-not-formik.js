import React, { useState } from "react";

// function Signup(){
//   return(
//     <h1>This is a signup page</h1>
//   )
// }


function SignUp({setUser}){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault()

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user)); // OR could make them still log in by redirecting to app "/" and not setting user
        window.location.href = "/home";
      }
    });
  }
  // form below

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Ben Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input 
        type="text"
        id="username"
        autoComplete="current-username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(event)=>setPassword(event.target.value)}
        />
      <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp;
// import NavBar from "../components/NavBar";
import { useState,setErrors } from "react";
import { Navigate, useNavigate} from "react-router-dom";

function Login({setUser}) {
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    //setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      //setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        console.log("Logged in and redirecting to /home")
        navigate("/home");
      } else {
        // r.json().then((err) => setErrors(err.errors));
        console.log("There was an issue with response OK logging in Ben")
      }
    });
  }

  return (
    <>
      <main>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input id="username" 
            type="text" 
            name="username" 
            placeholder="Username" 
            autoComplete="current-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <br/>
          <div>
            <label htmlFor="password">Password: </label>
            <input id="password" 
            type="password" 
            name="password" 
            placeholder="Password" 
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br/>
          <button type="submit">Submit</button>
        </form>

      </main>
    </>
  )

};

export default Login;
import NavBar from "../components/NavBar";

function Login({setUser}) {
  return (
    <>
      <header>
      {/* <NavBar /> shouldnt have a navbar for login content*/}
      </header>
      <main>
        <h1>Login</h1>

        <form>
          <div>
            <label for="username">Username: </label>
            <input id="username" type="text" name="username" placeholder="Username" autoComplete="current-username"/>
          </div>
          <br/>
          <div>
            <label for="password">Password: </label>
            <input id="password" type="password" name="password" placeholder="Password" autoComplete="current-password"/>
          </div>
          <br/>
          <button type="submit">Submit</button>
        </form>

      </main>
    </>
  )

};

export default Login;
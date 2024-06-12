import { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";

function LoginSignup({setUser}){
    const [showLogin, setShowLogin] = useState(true)

    return(
        <>
            <h1>LoginSignup Page!!</h1>
            {showLogin ? 
                (
                    <>
                    <p> Log in page</p>
                    < Login setUser={setUser}/>
                    <p>Don't have an account? Make on!</p>
                    <button onClick={()=>setShowLogin(false)}>Signup</button>
                    </>
                )
                :
                (
                    <>
                    <p> Signup page</p>
                    <Signup setUser={setUser}/>
                    <p>Already have an account? Log in instead!</p>
                    <button onClick={()=>setShowLogin(true)}>Login</button>
                    </>
                )
            }
        </>

    )
};

export default LoginSignup;
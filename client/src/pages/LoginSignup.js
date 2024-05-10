import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function LoginSignup(){
    const [showLogin, setShowLogin] = useState(true)

    return(
        <>
            <h1>LoginSignup Page!!</h1>
            {showLogin ? 
            (
                <>
                <p> Log in page</p>
                < Login />
                </>
            )
            :
            (
                <>
                <p> Signup page</p>
                <Signup />
                </>
            )

            }
        </>

    )
};

export default LoginSignup;



// https://github.com/learn-co-curriculum/python-p4-iam-putting-it-all-together-lab/blob/main/client/src/pages/Login.js
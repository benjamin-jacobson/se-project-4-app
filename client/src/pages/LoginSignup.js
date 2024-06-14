import { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";

function LoginSignup({setUser}){
    const [showLogin, setShowLogin] = useState(true)

    return(
        <>

        <div className='flex justify-center'>
        <h2 className='text-2xl font-semibold text-gray-600 text-center'>WenFren </h2>
        </div>

            {/* <h1 className='text-xs text-center text-gray-500 uppercase'>LoginSignup Page!!</h1> */}

            <div class="flex justify-center">
                <h1 className='px-4 py-3 w-5/6 text-center text-gray-600 font-bold'>
                    {showLogin ? 'Become Member' : 'Back to Login'}
                </h1>
            </div>
            {/* <div class="flex justify-center">
            
                    {showLogin ? 
                    <p className='text-xs text-center text-gray-500 uppercase'>Don't have an account? Make one!</p>
                     : <p className='text-xs text-center text-gray-500 uppercase'>Already have an account? Log in instead!</p>}
            </div> */}
              {showLogin ?
                <div class="flex justify-center">
  <button class="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  onClick={()=>setShowLogin(false)}>Back to Signup</button>
</div>
              :
              <div class="flex justify-center">
                <button class="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={()=>setShowLogin(true)}>Back to Login</button>
                </div>}

            
            {showLogin ? 
                (
                    <>
                    < Login setUser={setUser}/>
                    {/* <p className='text-xs text-center text-gray-500 uppercase'>Don't have an account? Make one!</p> */}
                    {/* <button onClick={()=>setShowLogin(false)}>Signup</button> */}
                    </>
                )
                :
                (
                    <>

                    <Signup setUser={setUser} />
                    {/* <p className='text-xs text-center text-gray-500 uppercase'>Already have an account? Log in instead!</p> */}
                    {/* <button onClick={()=>setShowLogin(true)}>Login</button> */}
                    </>
                )
            }
        </>

    )
};

export default LoginSignup;

// https://dev.to/przpiw/build-elegant-forms-reactformik-tailwind-54d8
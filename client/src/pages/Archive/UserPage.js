import { useEffect, useState } from "react";

function UserPage() {

    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch("/users")
        .then((r) => r.json())
        .then((usersArray) => {setUsers(usersArray)})}
        , []);

    
    return(
        <main>
            <p>{usersArray}</p>
      </main>
    )
}
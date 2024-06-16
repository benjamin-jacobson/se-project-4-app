import NavBar from "../components/NavBar";
import Header from "../components/Header";
import NewActivityForm from "../components/NewActivityForm";
import Search from "../components/SearchFriends";
import UpdateFriend from "../components/UpdateFriend";
import { useState, useEffect } from "react";

function Activity() {

  const [activities, setActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() =>{
    fetch("/activities")
      .then(r => r.json())
      .then(data => setActivities(data))
      .catch(error => console.error(error))
  }, [])

  const handleAddActivity = (newActivity) => {
    const updatedActivitiesArray = [...activities, newActivity];
    setActivities(updatedActivitiesArray);
  }

  const displayedFrens = activities.filter((fren) =>
  fren.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const arrayDataItems = displayedFrens.map((i) => (
    <ul class="list-inside" >
    <li key={i.id} className=" centered max-w-sm mx-auto font-medium text-slate-600">- {i.name}, {i.location},{i.type}</li> 
    </ul>
    ))

  return (
    <>
    <div class="flex">
    <div class="split w-1/2 ">
      <div class="centered">
      <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">Add an activity!</h1>
      <h2 class="centered max-w-sm mx-auto font-medium text-slate-300">What should we do?</h2>
        <NewActivityForm onAddActivity={handleAddActivity}  />
        <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

      </div>
    </div>

    <div class="split w-1/2 ">
      <div class="centered">
      <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">Available activities!</h1>
      <h2 class=" centered max-w-sm mx-auto font-medium text-slate-300">Search activities...</h2>

      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
      <br></br>
    
        <div class="max-w-sm mx-auto">
        <div>{arrayDataItems}</div>
        </div>
      </div>
    </div>
  </div>
    </>
  )

};

export default Activity;
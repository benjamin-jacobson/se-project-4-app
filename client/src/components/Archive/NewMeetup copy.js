import { useEffect, useState } from "react";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

function NewMeetup({handleAddMeeting}) {
  const [activities, setActivities] = useState([])

  const [date, setDate] = useState("");
  const [activityId, setActivityId] = useState("");
  const [errors, setErrors] = useState([]);

  const [dropdownDataFriends, setDropdownDataFriends] = useState([])
  const [selectedFriendId, setSelectedFriendId] = useState('');

  // activities used for a filter
  useEffect(() => {
    fetch("/activities")
      .then((r) => r.json())
      .then(data => setActivities(data))
      .catch(error => console.error(error))
    }, []);
    // console.log(activities)

  useEffect(() =>{
    fetch("/friends")
      .then(r => r.json())
      .then(data => setDropdownDataFriends(data))
      .catch(error => console.error(error))
  }, [])
  console.log(dropdownDataFriends)

    const handleChange = (event) => {
    setSelectedFriendId(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
            activity_id: Number(activityId),
            friend_id: Number(selectedFriendId),
            date: date,
    };
    fetch("/meetups", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(formData),
    }).then((r) => {
      console.log("yay")
      console.log(formData)
      handleAddMeeting(formData)
      setSelectedFriendId("")
      setDate("")
      setActivityId("")
      
    });
  }

  return (
    <>
    <h1>Hello World Meetup</h1>

    <h1>Select a friend</h1>
      <select value={selectedFriendId} onChange={handleChange}>
        <option value="" disabled>Select an option</option>
        {dropdownDataFriends.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

    
    <form onSubmit={handleSubmit}>
    <span class="absolute px-3 font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Add Meetup</span>
    <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      {/* <h2>Add Meetup</h2> */}
      <div>
        <label htmlFor="activity">Activity</label>
        <select
          id="activity"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
        >
          <option value="">Select activity...</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
    </>

  )
}

export default NewMeetup;
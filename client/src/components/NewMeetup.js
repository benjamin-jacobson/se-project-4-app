import { useEffect, useState } from "react";

function NewMeetup() {
  const [activities, setActivities] = useState([])

  const [date, setDate] = useState("");
  const [activityId, setActivityId] = useState("");
  const [errors, setErrors] = useState([]);

  const [dropdownDataFriends, setDropdownDataFriends] = useState([])
  const [selectedFriendId, setSelectedFriendId] = useState('');

  useEffect(() => {
    fetch("/activities")
      .then((r) => r.json())
      .then(data => setActivities(data))
      .catch(error => console.error(error))
    }, []);
    console.log(activities)

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
    console.log("test")
    console.log(formData)
    fetch("/meetups", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(formData),
    }).then((r) => {
      console.log("yay")
      setSelectedFriendId("")
      setDate("")
      setActivityId("")
      // TODO add any state update?
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
      <h2>Add Meetup</h2>
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
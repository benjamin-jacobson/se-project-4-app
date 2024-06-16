import { useEffect, useState } from "react";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const newMeetupFormValidationSchema = yup.object().shape({
})

function NewMeetup({ handleAddMeeting }) {
  const [activities, setActivities] = useState([])
  // const [date, setDate] = useState("");
  // const [activityId, setActivityId] = useState("");
  // const [errors, setErrors] = useState([]);

  const [dropdownDataFriends, setDropdownDataFriends] = useState([])
  // const [selectedFriendId, setSelectedFriendId] = useState('');

  // activities used for a filter
  useEffect(() => {
    fetch("/activities")
      .then((r) => r.json())
      .then(data => setActivities(data))
      .catch(error => console.error(error))
    }, []);

    useEffect(() =>{
      fetch("/friends")
        .then(r => r.json())
        .then(data => setDropdownDataFriends(data))
        .catch(error => console.error(error))
    }, [])
    console.log(dropdownDataFriends)

return (
  <div class="max-w-sm mx-auto" >
      <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <span class=" font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Add new meetups</span>

  <Formik
  validationSchema={newMeetupFormValidationSchema}
  initialValues={{
    id: '',
    activity: '',
    date: ''
  }}
    onSubmit={(values, { resetForm }) => {
      console.log("AGADSGA")
                console.log(values)
                const { id, activity, date } = values;
                const newValues = {
                  friend_id: Number(id),
                  activity_id: Number(activity),
                  date: date
                };

                  fetch("/meetups", {
                    method: "POST",
                    headers: {"Content-Type": "application/json",},
                    body: JSON.stringify(newValues),
                  }).then((r) => {
                    console.log("yay")
                    console.log(newValues)
                    handleAddMeeting(newValues)
                    // setSelectedFriendId("")
                    // setDate("")
                    // setActivityId("")
                    resetForm()
                    
                  }
                )
                }
              }
    
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
            <form onSubmit={handleSubmit}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="dropdown">Select a fren:</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="id"
              id="id"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.id}
            >
              <option value="" label="Select an option" />
              {dropdownDataFriends.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <br></br>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="dropdown">Select an activity:</label>
            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="activity"
              id="activity"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.activity}
            >
              <option value="" label="Select an option" />
              {activities.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.name}
                </option>
              ))}
            </select>
            <br></br>

        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="date">Select a date: </label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="date"
          name="date"
          placeholder="date"
          onChange={handleChange('date')}
          onBlur={handleBlur('date')}
          value={values.date}
        />
        {errors.date &&<h1 style={{ fontSize: 10, color: 'red' }}>{errors.date}</h1>}

        <br/>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit">Add new meetup!</button>
      </form>
    )}
  </Formik>
</div>
);
}

export default NewMeetup;
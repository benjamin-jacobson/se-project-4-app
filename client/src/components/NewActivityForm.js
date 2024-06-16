import { useState } from "react";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const newActivityFormValidationSchema = yup.object().shape({
  name: yup.string().min(1, ({ min }) => `Name must be at least ${min} characters`).required('Name is Required'),
  location: yup.string().min(1, ({ min }) => `Location must be at least ${min} characters`).required('Location is Required'),
  type: yup.string().min(1, ({ min }) => `Type must be at least ${min} characters`).required('Type is Required'),
})

function NewActivityForm({ onAddActivity }) {

return (
  <div className="new-activity-form">
  <Formik
  validationSchema={newActivityFormValidationSchema}
    initialValues={{ name: '', location: '', type: ''  }}
    onSubmit={(values, { resetForm }) => {
                      fetch("/activities", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      })
                        .then((r) => r.json())
                        .then((newActivity) => {
                          onAddActivity(newActivity);
                          resetForm()
                        }
                  );
                }
              }
    
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
      <form   class="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Name: </label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="name"
          name="name"
          placeholder="name"
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
        />
        {errors.name &&<h1 style={{ fontSize: 10, color: 'red' }}>{errors.name}</h1>}
        <br/>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="location">Location: </label>
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="location"
          name="location"
          placeholder="location (optional)"
          onChange={handleChange('location')}
          onBlur={handleBlur('location')}
          value={values.location}
        />
        {errors.location && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.location}</h1>}
        <br/>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="type">Type: </label>
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="type"
          name="type"
          placeholder="type (optional)"
          onChange={handleChange('type')}
          onBlur={handleBlur('type')}
          value={values.type}
        />
        {errors.type && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.type}</h1>}
        <br/>

        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit">Add new activity!</button>
      </form>
    )}
  </Formik>
</div>
);
}

export default NewActivityForm;
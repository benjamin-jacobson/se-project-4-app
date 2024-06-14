import { useState } from "react";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const newFreiendFormValidationSchema = yup.object().shape({
  name: yup.string().min(1, ({ min }) => `Name must be at least ${min} characters`).required('Name is Required'),
  favorite_color: yup.string().min(1, ({ min }) => `favorite_color must be at least ${min} characters`)
})

function NewFriendForm({ onAddFriend }) {

return (
  <div className="new-friend-form">
  <Formik
  validationSchema={newFreiendFormValidationSchema}
    initialValues={{ name: '', favorite_color: '' }}
    onSubmit={(values, { resetForm }) => {
                      fetch("/friends", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      })
                        .then((r) => r.json())
                        .then((newFriend) => {
                          onAddFriend(newFriend);
                          resetForm()
                        }
                  );
                }
              }
    
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
      <form   class="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="usernanameme">Name: </label>
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
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="favorite_color">Favorite Color: </label>
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="favorite_color"
          name="favorite_color"
          placeholder="favorite color (optional)"
          onChange={handleChange('favorite_color')}
          onBlur={handleBlur('favorite_color')}
          value={values.favorite_color}
        />
        {errors.favorite_color && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.favorite_color}</h1>}
        <br/>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="submit">Add new fren!</button>
      </form>
    )}
  </Formik>
</div>
);
}

export default NewFriendForm;
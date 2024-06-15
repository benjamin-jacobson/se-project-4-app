import React, { useState } from 'react';
// import React from "react";
import { Formik, Field, resetForm  } from "formik";
import * as yup from "yup";

function UpdateFriend({handleUpdateFren, friends}) {

    const loginValidationSchema = yup.object().shape({
      friendId: yup.number("Must be a number type"),
      name: yup.string().min(1, ({ min }) => `Password must be at least ${min} characters`),
      birthday:yup.string(),
      favorite_color:yup.string(),
      user_id: yup.number("Must be a number type")})

      console.log(friends)

  return (
        <div class="max-w-sm mx-auto">
          <span class="absolute px-3 font-medium text-slate-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">Update yo fren</span>
          <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
          {/* <br></br>
          <h2 class="text-slate-400">Update your fren</h2> */}
          <Formik
          validationSchema={loginValidationSchema}
            initialValues={{
              // name: '',
              // birthday: '',
              // favorite_color: '',
            }}
            onSubmit={(values, { resetForm }) => { //console.log(values)
                      fetch(`/friends/${values.id}`, {
                        method: "PATCH",
                        headers: {"Content-Type": "application/json",},
                        body: JSON.stringify(values),
                      }).then(
                        (res) => {
                          if (res.ok) {
                            console.log("ok")
                            handleUpdateFren(values)
                            window.location.reload(); // better with controlled state but time consuming lol TODO 
                            
                        }
                      }
                      )
                    }
                  }
            
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
              <form onSubmit={handleSubmit}>
                  <br></br>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="dropdown">Select a fren:</label>
                  <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="id"
                    id="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dropdown}
                  >
                    <option value="" label="Select an option" />
                    {friends.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                  {/* <input
                  type="friendId"
                  name="friendId"
                  placeholder="friendId"
                  onChange={handleChange('friendId')}
                  onBlur={handleBlur('friendId')}
                  value={values.friendId}
                />
                {errors.friendId &&<h1 style={{ fontSize: 10, color: 'red' }}>{errors.friendId}</h1>} */}
                <br></br>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Name: </label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="name"
                  name="name"
                  placeholder="Update name ..."
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.name}</h1>}
                <br></br>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="birthday">Birthday: </label>
                  <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  name="birthday"
                  placeholder="birthday"
                  onChange={handleChange('birthday')}
                  onBlur={handleBlur('birthday')}
                  value={values.birthday}
                />
                {errors.birthday && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.birthday}</h1>}
                <br></br>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="favorite_color">Favorite Color: </label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="favorite_color"
                  name="favorite_color"
                  placeholder="Update favorite color ..."
                  onChange={handleChange('favorite_color')}
                  onBlur={handleBlur('favorite_color')}
                  value={values.favorite_color}
                />
                {errors.favorite_color && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.favorite_color}</h1>}
                <br></br>
                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit">Update my fren!</button>
              </form>
            )}
          </Formik>
        </div>
      );
    }

export default UpdateFriend;

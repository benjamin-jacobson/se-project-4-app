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
        <div className="loginContainer">
          <h1>Update Friend</h1>
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
                            window.location.reload(); // better with controlled state but time consuming lol
                            
                        }
                      }
                      )
                    }
                  }
            
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
              <form onSubmit={handleSubmit}>

                  <label htmlFor="dropdown">Select an option:</label>
                  <select
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
                <input
                  type="name"
                  name="name"
                  placeholder="Update name ..."
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.name}</h1>}
                  <input
                  type="date"
                  name="birthday"
                  placeholder="birthday"
                  onChange={handleChange('birthday')}
                  onBlur={handleBlur('birthday')}
                  value={values.birthday}
                />
                {errors.birthday && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.birthday}</h1>}
                <input
                  type="favorite_color"
                  name="favorite_color"
                  placeholder="Update favorite color ..."
                  onChange={handleChange('favorite_color')}
                  onBlur={handleBlur('favorite_color')}
                  value={values.favorite_color}
                />
                {errors.favorite_color && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.favorite_color}</h1>}
                
                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
        </div>
      );
    }

export default UpdateFriend;

import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

function Signup({setUser}) {

  const signupValidationSchema = yup.object().shape({
    username: yup.string().min(3, ({ min }) => `Username must be at least ${min} characters`).required('Username is Required'),
    password: yup.string().min(3, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
    // email: yup
    //   .string()
    //   .email("Please enter valid email")
    //   .required('Email Address is Required'),
  })

  return (
    <div className="signupContainer">
      <Formik
      validationSchema={signupValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
                  fetch("signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  }).then(
                    (res) => {
                      if (res.ok) {
                        res.json().then((user) => setUser(user)); // OR could make them still log in by redirecting to app "/" and not setting user
                        window.location.href = "/friends";
                    }
                  }
                  )
                }
              }
        
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
          <form   class="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="username">Username: </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username &&<h1 style={{ fontSize: 10, color: 'red' }}>{errors.username}</h1>}
            <br/>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password: </label>
            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && <h1 style={{ fontSize: 10, color: 'red' }}>{errors.password}</h1>}
            {/* <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email &&<h1 style={{ fontSize: 10, color: 'red' }}>{errors.email}</h1>} */}
            <br/>
            <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit">Sign me up!</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;

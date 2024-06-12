import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

function Signup({setUser}) {

  const loginValidationSchema = yup.object().shape({
    username: yup.string().min(3, ({ min }) => `Username must be at least ${min} characters`).required('Username is Required'),
    password: yup.string().min(3, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
    // email: yup
    //   .string()
    //   .email("Please enter valid email")
    //   .required('Email Address is Required'),
  })

  return (
    <div className="loginContainer">
      <h1>Login Screen</h1>
      <Formik
      validationSchema={loginValidationSchema}
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
                        window.location.href = "/home";
                    }
                  }
                  )
                }
              }
        
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
          <form onSubmit={handleSubmit}>
              <input
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username &&<h1 style={{ fontSize: 10, color: 'red' }}>{errors.username}</h1>}
            <input
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
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;

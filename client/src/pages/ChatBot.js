import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

function ChatBot() {
  const [chatbotResponse, setChatbotResponse] = useState("")

  const chatValidationSchema = yup.object().shape({
    user_input: yup.string().min(1, ({ min }) => `Input must be at least ${min} characters`).required('Input is Required'),
  })

  return(

    <div class="max-w-sm mx-auto" className="chatbot-form">
          <h1 class=" max-w-sm mx-auto text-teal-300 text-xl">Ask the FrenBot anything!</h1>
          <br></br>
    <Formik
      validationSchema={chatValidationSchema}
        initialValues={{ user_input: ''}}
        onSubmit={(values, { resetForm }) => {
                  fetch("/chatbot", {
                    method: "POST",
                    headers: {"Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  }).then(
                    (res) => {
                      if (res.ok) {
                        res.json().then((i) => setChatbotResponse(i))
                        resetForm()
                    }
                  }
                  )
                }
              }
        
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
          <form   class="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="username">user_input: </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="user_input"
              name="user_input"
              placeholder="Enter some text..."
              onChange={handleChange('user_input')}
              onBlur={handleBlur('user_input')}
              value={values.user_input}
            />
            {errors.user_input &&<h1 style={{ fontSize: 10, color: 'red' }}>{errors.user_input}</h1>}
            <br></br>
            <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit">Ask FrenBot!</button>
          </form>
        )}
      </Formik>
      <br></br>
      <div className="max-w-sm mx-auto">
      {chatbotResponse.length === 0 ? (<p  class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        > No response yet...</p>) 
                                    : (<p  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                      >{chatbotResponse.content} </p>)
    }</div>
    </div>
)
}

export default ChatBot;
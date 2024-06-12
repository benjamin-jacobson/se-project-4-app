import React, { useState } from 'react';
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

function UpdateFriend({handleUpdateFren, friends}) {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');
    const [userId, setUserId] = useState('');
    const [id, setId] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFren = {
                              id: id,
                              name: name,
                              birthday: birthday,
                              favoriteColor: favoriteColor,
                              userId: userId
                            }
        
                            handleUpdate(updatedFren)
                          }
                        
        const handleUpdate = async (updatedFren) => {
          const response = await fetch(`/friends/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(updatedFren),
          })
          const data = await response.json();
          handleUpdateFren(data)
               }

    return (
        <div>
            <h1>Update Friend</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">Friend ID:</label>
                <input
                    type="number"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                /><br />
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br />
                <label htmlFor="birthday">Birthday:</label>
                <input
                    type="date"
                    id="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                /><br />
                <label htmlFor="favoriteColor">Favorite Color:</label>
                <input
                    type="text"
                    id="favoriteColor"
                    value={favoriteColor}
                    onChange={(e) => setFavoriteColor(e.target.value)}
                /><br />
                <label htmlFor="userId">User ID:</label>
                <input
                    type="number"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                /><br />
                <button type="submit">Update Friend</button>
            </form>
        </div>
    );
}

export default UpdateFriend;

import { useState } from "react";

function NewFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [favorite_color, setFavoriteColor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        favorite_color: favorite_color
      }),
    })
      .then((r) => r.json())
      .then((newFriend) => onAddFriend(newFriend));
  }

  return (
    <div className="new-friend-form">
      <h1>New Friend</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Friend name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Favorite Color"
          value={favorite_color}
          onChange={(e) => setFavoriteColor(e.target.value)}
        />
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}

export default NewFriendForm;
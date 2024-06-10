function FriendCard({friend, onDeleteFriend  }) {

  const { id, name, birthday, favorite_color ,user_id } = friend;
  const handleDeleteClick = async () => {

    const response = await fetch(`/friends/${id}`, {
    method: "DELETE",
  });
    if (response.ok) {
      onDeleteFriend(id);
      alert("Deleted Successfully 🌼")
    }
}

  // console.log(friend)
    return (
      <article>
          <h2> {friend.id} {friend.name} {friend.birthday}</h2>
          <button onClick={handleDeleteClick}> Delete </button>
      </article>
    );
  };
  
  export default FriendCard;
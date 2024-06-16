function FriendCard({friend, onDeleteFriend  }) {

  const { id, name, birthday, favorite_color ,user_id } = friend;
  const handleDeleteClick = async () => {

    const response = await fetch(`/friends/${friend.id}`, {
    method: "DELETE",
  });
    if (response.ok) {
      onDeleteFriend(id);
      alert("Deleted Successfully, " + friend.name + " 😭")
    }
}

    return (
<>
  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {friend.name} </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Friend Id: {friend.id}</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Birthday: {friend.birthday}</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Favorite Color: {friend.favorite_color}</p>
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleDeleteClick}> Delete </button>

  </div>
</>
    );
  };
  
  export default FriendCard;

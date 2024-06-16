function MeetingCardButton({meeting, onDeleteMeeting}) {

      const handleDeleteClick = async () => {
  
      const response = await fetch(`/meetups/${meeting.id}`, {
      method: "DELETE",
    });
      if (response.ok) {
        onDeleteMeeting(meeting.id);
        alert("Deleted Successfully, meeting id: " + meeting.id + " 💣")
      }
  }

    return (
      <>
        <div>MeetingID: {meeting.id} Date: {meeting.date}</div>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleDeleteClick}> Delete meeting</button>
      </>
    )
  };
  
  export default MeetingCardButton;
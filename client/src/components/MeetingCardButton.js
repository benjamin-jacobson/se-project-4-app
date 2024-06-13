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
        <button onClick={handleDeleteClick} >Delete meeting</button>
      </>
    )
  };
  
  export default MeetingCardButton;
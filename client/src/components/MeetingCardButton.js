function MeetingCardButton({meeting, onDeleteMeeting}) {

      const handleDeleteClick = async () => {
  
      const response = await fetch(`/meetups/${meeting.id}`, {
      method: "DELETE",
    });
      if (response.ok) {
        onDeleteMeeting(meeting.id);
        alert("Deleted Successfully")
      }
  }

    return (
      <>
        <div>Date: {meeting.date}</div>
        <button onClick={handleDeleteClick} >Delete meeting</button>
      </>
    )
  };
  
  export default MeetingCardButton;
import MeetingCardButton from './MeetingCardButton.js'

function MeetingCard({name, user_id, meetings, handleDeleteMeeting}) {

    return (
      <article>
          <h2>Userid {user_id}: Friend:{name}</h2> 
          <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            <MeetingCardButton meeting={meeting} onDeleteMeeting={handleDeleteMeeting} />
          </li>
        ))}
      </ul>
      </article>
    );
  };
  
  export default MeetingCard;
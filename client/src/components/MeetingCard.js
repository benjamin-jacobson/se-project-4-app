function MeetingCard({name, user_id, meetings}) {
    return (
      <article>
          <h2>{user_id}: {name}</h2>
          <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            <div>Date: {meeting.date}</div>
          </li>
        ))}
      </ul>
      </article>
    );
  };
  
  export default MeetingCard;
import MeetingCardButton from './MeetingCardButton.js'

function MeetingCard({name, user_id, meetings, handleDeleteMeeting}) {

    return (
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Userid {user_id}: Friend: {name}</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Meeting: </p>
      <ul>
            {meetings.map(meeting => (
              <li key={meeting.id}>
                <MeetingCardButton meeting={meeting} onDeleteMeeting={handleDeleteMeeting} />
              </li>
            ))}
          </ul>
          
    </div>
    );
  };
  
  export default MeetingCard;






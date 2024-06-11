import React, { useState } from 'react';

function AddFriendMeeting() {
  // const [friendName, setFriendName] = useState('');
  // const [friendBirthday, setFriendBirthday] = useState('');
  // const [friendFavoriteColor, setFriendFavoriteColor] = useState('');
  // const [userId, setUserId] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingScheduledTime, setMeetingScheduledTime] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [meetingType, setMeetingType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/add_friend_meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // friend_name: friendName,
        // friend_birthday: friendBirthday,
        // friend_favorite_color: friendFavoriteColor,
        // user_id: userId,
        meeting_topic: meetingTopic,
        meeting_scheduled_time: meetingScheduledTime,
        meeting_location: meetingLocation,
        meeting_type: meetingType
      })
    });

    const data = await response.json();
    console.log(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input 
        type="text" 
        value={friendName} 
        onChange={(e) => setFriendName(e.target.value)} 
        placeholder="Friend Name" 
      />
      <input 
        type="date" 
        value={friendBirthday} 
        onChange={(e) => setFriendBirthday(e.target.value)} 
        placeholder="Friend Birthday" 
      />
      <input 
        type="text" 
        value={friendFavoriteColor} 
        onChange={(e) => setFriendFavoriteColor(e.target.value)} 
        placeholder="Friend Favorite Color" 
      />
      <input 
        type="number" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        placeholder="User ID" 
      /> */}
      <input 
        type="text" 
        value={meetingTopic} 
        onChange={(e) => setMeetingTopic(e.target.value)} 
        placeholder="Meeting Topic" 
      />
      <input 
        type="datetime-local" 
        value={meetingScheduledTime} 
        onChange={(e) => setMeetingScheduledTime(e.target.value)} 
        placeholder="Meeting Scheduled Time" 
      />
      <input 
        type="text" 
        value={meetingLocation} 
        onChange={(e) => setMeetingLocation(e.target.value)} 
        placeholder="Meeting Location" 
      />
      <input 
        type="text" 
        value={meetingType} 
        onChange={(e) => setMeetingType(e.target.value)} 
        placeholder="Meeting Type" 
      />
      <button type="submit">Add Friend and Meeting</button>
    </form>
  );
}

export default AddFriendMeeting;
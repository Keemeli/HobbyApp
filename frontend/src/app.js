import React, { useState } from 'react';

function App() {
  const [sessions, setSessions] = useState([
    { id: 1, title: 'Football Practice', date: '2025-10-10', time: '18:00' },
    { id: 2, title: 'Chess Club', date: '2025-10-12', time: '19:30' },
  ]);

  return (
    <div>
      <h1>My Hobby Sessions</h1>
      {sessions.map(session => (
        <div key={session.id}>
          <h3>{session.title}</h3>
          <p>Date: {session.date}</p>
          <p>Time: {session.time}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

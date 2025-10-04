import React, { useState, useEffect } from 'react';

function App() {
  const [sessions, setSessions] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(response => response.json())
      .then(data => setSessions(data))
      .catch(error => console.log('Error:', error));
  }, []);

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

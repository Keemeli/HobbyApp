import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [sessions, setSessions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: 10,
    type: 'public'
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(response => response.json())
      .then(data => setSessions(data))
      .catch(error => console.log('Error:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const newSession = await response.json();
        setSessions([...sessions, newSession]);
        setShowCreateForm(false);
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          maxParticipants: 10,
          type: 'public'
        });
        alert('Session created successfully!');
        console.log('Session created successfully!');
      } else {
        console.error('Failed to create session');
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <div className="App">
      <h1>My Hobby Sessions</h1>
      <p>Debug: React is working</p>  
      <button onClick={() => setShowCreateForm(true)}>
  Create New Session
</button>
{showCreateForm && (
  <div>
    <h2>Create New Session</h2>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Session Title" 
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <input 
        type="date" 
        value={formData.date}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
        required
      />
      <input 
        type="time" 
        value={formData.time}
        onChange={(e) => setFormData({...formData, time: e.target.value})}
        required
      />
      <input 
        type="number" 
        placeholder="Maximum Participants" 
        value={formData.maxParticipants}
        onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
        min="1"
        required
      />
      <select 
        value={formData.type}
        onChange={(e) => setFormData({...formData, type: e.target.value})}
      >
        <option value="public">Public Session</option>
        <option value="private">Private Session</option>
      </select>
      <textarea 
        placeholder="Session Description (optional)" 
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <button type="submit">
        Create Session
      </button>
      <button type="button" onClick={() => setShowCreateForm(false)}>
        Cancel
      </button>
    </form>
  </div>
)}
      {sessions.map(session => (
        <div key={session.id} className="session-card">
          <h3>{session.title}</h3>
          {session.description && <p>{session.description}</p>}
          <p className="session-details">Date: {session.date}</p>
          <p className="session-details">Time: {session.time}</p>
          <p className="session-details">Max: {session.maxParticipants || 'Not specified'}</p>
          <p className="session-details">Type: {session.type || 'public'}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

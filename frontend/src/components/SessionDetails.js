import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joinData, setJoinData] = useState({ name: '', email: '' });
  const [joinSuccess, setJoinSuccess] = useState('');

  useEffect(() => {
    loadSession();
  }, [id]);

  const loadSession = async () => {
    try {
      const data = await api.getSession(id);
      setSession(data);
    } catch (err) {
      setError('Failed to load session');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinChange = (e) => {
    setJoinData({
      ...joinData,
      [e.target.name]: e.target.value
    });
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const result = await api.joinSession(id, joinData);
      setJoinSuccess(`Joined successfully! Your attendance code: ${result.attendanceCode}`);
      setJoinData({ name: '', email: '' });
      // Reload session to show updated attendee count
      loadSession();
    } catch (err) {
      setError('Failed to join session');
    }
  };

  if (loading) return <div>Loading session...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!session) return <div>Session not found</div>;

  return (
    <div>
      <h2>{session.title}</h2>
      
      <div className="session-card">
        <p><strong>Date:</strong> {session.date}</p>
        <p><strong>Time:</strong> {session.time}</p>
        <p><strong>Description:</strong> {session.description || 'No description'}</p>
        <p><strong>Participants:</strong> {session.attendees.length}/{session.maxParticipants}</p>
        <p><strong>Type:</strong> {session.type}</p>
        
        <h3>Current Attendees:</h3>
        {session.attendees.length === 0 ? (
          <p>No attendees yet</p>
        ) : (
          <ul>
            {session.attendees.map(attendee => (
              <li key={attendee.id}>{attendee.name}</li>
            ))}
          </ul>
        )}
      </div>

      <h3>Join This Session</h3>
      {joinSuccess && <div className="success">{joinSuccess}</div>}
      
      <form onSubmit={handleJoin}>
        <div className="form-group">
          <label>Your Name *</label>
          <input
            type="text"
            name="name"
            value={joinData.name}
            onChange={handleJoinChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email (optional)</label>
          <input
            type="email"
            name="email"
            value={joinData.email}
            onChange={handleJoinChange}
          />
        </div>
        
        <button type="submit">Join Session</button>
      </form>
    </div>
  );
}

export default SessionDetails;

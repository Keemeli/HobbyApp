import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await api.getSessions();
      setSessions(data);
    } catch (err) {
      setError('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>All Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions available. <Link to="/create">Create the first one!</Link></p>
      ) : (
        sessions.map(session => (
          <div key={session.id} className="session-card">
            <h3>{session.title}</h3>
            <p><strong>Date:</strong> {session.date}</p>
            <p><strong>Time:</strong> {session.time}</p>
            <p><strong>Participants:</strong> {session.attendees.length}/{session.maxParticipants}</p>
            {session.description && <p>{session.description}</p>}
            <Link to={`/session/${session.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default SessionList;

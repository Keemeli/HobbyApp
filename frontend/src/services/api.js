const API_BASE = 'http://localhost:3001/api';

export const api = {
  // Get all sessions
  getSessions: async () => {
    const response = await fetch(`${API_BASE}/sessions`);
    return response.json();
  },

  // Create new session
  createSession: async (sessionData) => {
    const response = await fetch(`${API_BASE}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });
    return response.json();
  },

  // Get specific session
  getSession: async (id) => {
    const response = await fetch(`${API_BASE}/sessions/${id}`);
    return response.json();
  },

  // Join session
  joinSession: async (id, attendeeData) => {
    const response = await fetch(`${API_BASE}/sessions/${id}/attend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendeeData),
    });
    return response.json();
  }
};

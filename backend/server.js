const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage for quick development (you can change to JSON file later)
let sessions = [];

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date() });
});

// Get all public sessions
app.get('/api/sessions', (req, res) => {
  const publicSessions = sessions.filter(session => session.type === 'public');
  res.json(publicSessions);
});

// Create new session
app.post('/api/sessions', (req, res) => {
  const { title, description, date, time, maxParticipants, type } = req.body;
  
  if (!title || !date || !time) {
    return res.status(400).json({ error: 'Title, date, and time are required' });
  }

  const newSession = {
    id: uuidv4(),
    title,
    description: description || '',
    date,
    time,
    maxParticipants: maxParticipants || 10,
    type: type || 'public',
    managementCode: Math.random().toString(36).substring(2, 10),
    attendees: [],
    createdAt: new Date().toISOString()
  };

  sessions.push(newSession);
  res.status(201).json(newSession);
});

// Get specific session
app.get('/api/sessions/:id', (req, res) => {
  const session = sessions.find(s => s.id === req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  // Don't return management code in public view
  const { managementCode, ...publicSession } = session;
  res.json(publicSession);
});

// Join session
app.post('/api/sessions/:id/attend', (req, res) => {
  const { name, email } = req.body;
  const session = sessions.find(s => s.id === req.params.id);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  if (session.attendees.length >= session.maxParticipants) {
    return res.status(400).json({ error: 'Session is full' });
  }

  const attendee = {
    id: uuidv4(),
    name,
    email: email || '',
    attendanceCode: Math.random().toString(36).substring(2, 8),
    joinedAt: new Date().toISOString()
  };

  session.attendees.push(attendee);
  res.json({ 
    message: 'Successfully joined session',
    attendanceCode: attendee.attendanceCode 
  });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Load sessions from file
let sessions = [];
try {
  const data = fs.readFileSync(path.join(__dirname, 'sessions.json'), 'utf8');
  sessions = JSON.parse(data);
  console.log('Loaded sessions from file:', sessions.length);
} catch (error) {
  console.error('Error loading sessions:', error);
  sessions = [];
}

app.use(cors());
app.use(express.json());

// Get all sessions
app.get('/api/sessions', (req, res) => {
  res.json(sessions);
});

// Create new session
app.post('/api/sessions', (req, res) => {
  const newSession = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || '',
    date: req.body.date,
    time: req.body.time,
    maxParticipants: req.body.maxParticipants || 10,
    type: req.body.type || 'public',
    participants: []
  };
  
  sessions.push(newSession);
  
  try {
    fs.writeFileSync(path.join(__dirname, 'sessions.json'), JSON.stringify(sessions, null, 2));
    console.log('Session created and saved:', newSession.title);
  } catch (error) {
    console.error('Error saving sessions:', error);
    return res.status(500).json({ error: 'Failed to save session' });
  }
  
  res.status(201).json(newSession);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

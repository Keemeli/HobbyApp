# Hobby Session Planner

A full-stack web application for organizing hobby sessions built with React and Node.js.

## Features

- Create hobby sessions with title, description, date, time, and participant limits
- View all created sessions in a list
- Session data persists in JSON file storage
- Full-stack React frontend with Express backend

## Setup Instructions

### Prerequisites
- Node.js installed on your system
- npm package manager

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   Server will run on http://localhost:3001

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
   App will open in browser at http://localhost:3000

## Usage

1. Make sure both backend and frontend servers are running
2. Open http://localhost:3000 in your browser
3. Click "Create New Session" to add a new hobby session
4. Fill in the session details and submit
5. View all sessions in the main list

## Technical Details

- **Frontend**: React with hooks (useState, useEffect)
- **Backend**: Express.js with CORS
- **Database**: JSON file storage
- **API Endpoints**: 
  - GET /api/sessions - List all sessions
  - POST /api/sessions - Create new session

## Project Structure
```
HobbyApp/
├── backend/
│   ├── server.js
│   ├── sessions.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

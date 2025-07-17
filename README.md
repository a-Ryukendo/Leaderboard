# Leaderboard App

A full-stack leaderboard application built with Node.js, Express, MongoDB, and React (Material UI).

## Features
- Select or add users to the leaderboard
- Claim random points for users
- Real-time, paginated leaderboard (sorted by points)
- Paginated claim history log
- Responsive, clean, and modern UI (Material UI)
- Well-structured, reusable code with comments and best practices

## Directory Structure
```
Leaderboard/
  backend/    # Node.js + Express + MongoDB API
  frontend/   # React + Material UI frontend
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or remote)

### Backend Setup
1. Open a terminal and navigate to `Leaderboard/backend`
2. Copy `.env.example` to `.env` and set your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/leaderboard
   PORT=4000
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. (Optional) Seed 10 users:
   ```
   curl -X POST http://localhost:4000/seed-users
   ```

### Frontend Setup
1. Open a new terminal and navigate to `Leaderboard/frontend`
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
4. Visit [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints
- `GET /users?page=1&limit=10` — Paginated leaderboard
- `POST /users` — Add user (`{ name }`)
- `POST /claim` — Claim points for user (`{ userId }`)
- `GET /claim-history?page=1&limit=10` — Paginated claim log
- `POST /seed-users` — Seed 10 users if none exist

## Assignment Bonus Features
- Clean, modern, and responsive UI
- Efficient pagination logic
- Well-structured and reusable code
- Code comments and best practices

---

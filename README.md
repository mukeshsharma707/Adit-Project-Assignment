# Task Manager App

A full-stack task management application built with React, Vite, Node.js, Express, MongoDB, and JWT authentication.

## Features

- Responsive home page and auth UI
- User signup and login
- Protected task dashboard
- Create, edit, delete tasks
- Mark tasks as completed or pending
- Task search and filter by status
- Pagination support for task lists
- Backend REST APIs with JWT-protected routes

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Styling: CSS modules / component CSS

## Setup

### Backend

1. Navigate to `backend`
2. Copy `.env.example` to `.env`
3. Update MongoDB connection string if needed
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to `frontend`
2. Create `.env` with:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Tasks

- `GET /api/tasks` - protected
- `POST /api/tasks` - protected
- `PUT /api/tasks/:id` - protected
- `DELETE /api/tasks/:id` - protected

Query params for tasks:
- `status=completed|pending`
- `search=keyword`
- `page=1`
- `limit=6`

## Folder Structure

- `backend/` - server code, models, routes, middleware
- `frontend/` - React app and UI components

## Deployment

- Deploy backend to providers like Railway, Render, or Heroku
- Deploy frontend to Vercel, Netlify, or Cloudflare Pages
- Configure frontend `VITE_API_URL` to point to the deployed backend
- Ensure backend `.env` contains `JWT_SECRET` and `MONGODB_URI`

## Assumptions

- Users are uniquely identified by email
- Tasks are user-specific
- Basic validation is handled on both client and server
- JWT tokens are stored in localStorage for session persistence

# Task Manager Pro

A comprehensive full-stack task management platform designed for individuals and teams to organize, track, and complete work efficiently.

## Core Features

- **User Authentication**: Secure signup and login with JWT-based access control
- **Task Dashboard**: Intuitive interface to manage all your tasks in one place
- **Full CRUD Operations**: Create, read, update, and delete tasks with real-time updates
- **Smart Filtering**: Filter tasks by completion status (pending/completed) for better visibility
- **Advanced Search**: Search tasks by title or description with case-insensitive matching
- **Pagination**: Handle large task lists with efficient pagination (6 tasks per page)
- **Status Tracking**: Mark tasks as completed or pending, with automatic count aggregation
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Session Persistence**: Automatic login state management via secure token storage

## Technology Stack

### Frontend
- **React 19.2.6** - Modern UI library with functional components and hooks
- **Vite 8.0.12** - Lightning-fast build tool and dev server
- **React Router DOM 6.14.2** - Client-side routing with protected route guards
- **Context API** - Global state management for authentication
- **CSS3** - Responsive styling with custom properties and modern layouts
- **ESLint** - Code quality and consistency

### Backend
- **Node.js** - JavaScript runtime for server-side execution
- **Express.js 5.2.1** - Minimal and flexible REST API framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose 7.6.0** - ODM for schema validation and database operations
- **JWT (jsonwebtoken 9.0.2)** - Stateless authentication with secure tokens
- **bcryptjs 2.4.3** - Password hashing with 10 salt rounds
- **CORS 2.8.6** - Cross-origin resource sharing middleware
- **dotenv 17.4.2** - Environment variable management
- **nodemon 3.1.14** - Development auto-reload for efficient development

### Infrastructure
- **MongoDB Atlas** - Cloud database hosting
- **Render** - Backend deployment platform
- **Vercel** - Frontend deployment platform

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

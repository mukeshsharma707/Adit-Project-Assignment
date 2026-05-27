# Task Manager Frontend

This frontend powers a task management application built with React and Vite.

## Local setup

1. Navigate to `frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure the backend is running on `http://localhost:5000`
4. Create `.env` with:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
5. Start the app:
   ```bash
   npm run dev
   ```

## App features

- Home page with auth CTA
- Signup and login pages
- Protected task dashboard
- Search tasks by title and description
- Pagination for task lists
- Task filtering by status

## Notes

- The root README contains full project setup and API details.
- The frontend consumes backend routes from `VITE_API_URL`.

Task Tracker
============

A full-stack Task Tracker app built with React, Node.js, Express, and MongoDB. Manage projects and their associated tasks with a simple UI and robust API.

Features
--------
- Create and manage projects
- Add, update, and delete tasks
- Filter tasks by status
- Responsive UI using Tailwind CSS
- RESTful API built with Express
- MongoDB local database using Compass

Backend Setup (Node.js + Express + MongoDB)
-------------------------------------------
1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

3. Create a `.env` file in the root of the backend and add the following:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/task-tracker
   JWT_SECRET=your_jwt_secret

4. Make sure MongoDB Compass is running on localhost.

5. Start the backend server:
   npm run dev

6. Backend should be live at:
   http://localhost:5000

Frontend Setup (React + Tailwind)
---------------------------------
1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Start the React development server:
   npm run dev

4. Frontend will be running at:
   http://localhost:5174



Tech Stack
----------
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Compass)
- Other: Axios, dotenv

Author
------
Skyakash  
GitHub: https://github.com/Skyakash990


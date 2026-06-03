# MERN Task Manager

A full-stack Task Management application built using the MERN stack.

## Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Create Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks Complete/Pending
* Search Tasks
* Filter Tasks (All / Completed / Pending)
* Task Statistics Dashboard
* Toast Notifications
* Responsive UI with Tailwind CSS

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Installation

### Backend

```bash
cd task-manager-backend
npm install
npm start
```

### Frontend

```bash
cd task-manager-frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside `task-manager-backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Project Structure

TaskManager/
├── task-manager-backend/
└── task-manager-frontend/

## Author

Revathi

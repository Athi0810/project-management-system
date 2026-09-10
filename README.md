# Project Management System

A full-stack Project Management System for managing projects, tasks, and progress in one place.

## Tech Stack

* Frontend: React.js, Vite, Axios, React Router
* Backend: Node.js, Express.js
* Database: MySQL
* Authentication: JWT, bcrypt
* Validation: express-validator
* Logging: Morgan

## Features

### Authentication

* User registration
* User login and logout
* Password hashing using bcrypt
* JWT authentication
* Protected routes
* Authentication rate limiting

### Project Management

* Create, view, update, and delete projects
* Search projects by name
* Filter projects by status
* Project start and end dates

### Task Management

* Create, view, update, and delete tasks
* Assign tasks to projects
* Search tasks by name
* Filter tasks by status and priority
* Mark tasks as completed
* Task due dates

### Dashboard

* Total Projects
* Total Tasks
* Completed Tasks
* Pending Tasks
* Projects In Progress

## Project Structure

```text
project-management-system/
├── backend/
├── frontend/
├── database/
│   ├── schema.sql
│   └── er-diagram.png
├── docs/
│   └── API.md
├── .gitignore
└── README.md
```

## Database

The application uses MySQL with three main tables:

* Users
* Projects
* Tasks

Relationships:

* One user can have many projects.
* One project can have many tasks.
* Each project belongs to one user.
* Each task belongs to one project.

### ER Diagram

![ER Diagram](database/er-diagram.png)

### Database Setup

Run the SQL file:

```text
database/schema.sql
```

Database name:

```text
project_management_db
```

## Backend Setup

Open the terminal:

```powershell
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=project_management_db

JWT_SECRET=YOUR_SECRET_KEY
JWT_EXPIRES_IN=1d
```

Start the backend:

```powershell
npm start
```

Backend URL:

```text
http://localhost:5000
```

## Frontend Setup

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## API Documentation

Complete API documentation is available in:

```text
docs/API.md
```

Main API endpoints:

| Module    | Method         | Endpoint             |
| --------- | -------------- | -------------------- |
| Register  | POST           | `/api/auth/register` |
| Login     | POST           | `/api/auth/login`    |
| Logout    | POST           | `/api/auth/logout`   |
| Projects  | GET/POST       | `/api/projects`      |
| Project   | GET/PUT/DELETE | `/api/projects/:id`  |
| Tasks     | GET/POST       | `/api/tasks`         |
| Task      | GET/PUT/DELETE | `/api/tasks/:id`     |
| Dashboard | GET            | `/api/dashboard`     |

## Security

* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Protected APIs require authentication.
* Users can access only their own projects and tasks.
* Input validation is implemented using express-validator.
* SQL queries use parameterized values.
* Authentication endpoints use rate limiting.
* Sensitive environment variables are excluded from GitHub.

## Error Handling

The application handles:

* Validation errors
* Authentication errors
* Authorization errors
* Resource not found errors
* Duplicate email registration
* Server errors
* Frontend loading and error states

## Future Improvements

* Pagination
* Sorting
* Automated testing
* Docker support
* CI/CD
* Audit logs
* Cloud deployment
* Role-based access control

## Author

Athithyan S

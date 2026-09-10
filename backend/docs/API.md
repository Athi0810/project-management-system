# Project Management System API Documentation

## Base URL

http://localhost:5000/api

## Authentication

Protected APIs require a JWT token.

Add this header:

Authorization: Bearer <token>

---

# 1. Authentication APIs

## Register

**Method:** POST

**Endpoint:** `/auth/register`

**Authentication:** Not required

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login

**Method:** POST

**Endpoint:** `/auth/login`

**Authentication:** Not required

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

The API returns a JWT token.

---

## Logout

**Method:** POST

**Endpoint:** `/auth/logout`

**Authentication:** Required

---

# 2. Project APIs

## Get All Projects

**Method:** GET

**Endpoint:** `/projects`

**Authentication:** Required

### Search

```text
GET /projects?search=website
```

### Filter by Status

```text
GET /projects?status=In Progress
```

---

## Get Project by ID

**Method:** GET

**Endpoint:** `/projects/:id`

**Authentication:** Required

Example:

```text
GET /projects/1
```

---

## Create Project

**Method:** POST

**Endpoint:** `/projects`

**Authentication:** Required

### Request Body

```json
{
  "projectName": "Website Development",
  "description": "Develop company website",
  "status": "In Progress",
  "startDate": "2026-09-01",
  "endDate": "2026-10-01"
}
```

### Allowed Status

* Not Started
* In Progress
* Completed

---

## Update Project

**Method:** PUT

**Endpoint:** `/projects/:id`

**Authentication:** Required

Example:

```text
PUT /projects/1
```

---

## Delete Project

**Method:** DELETE

**Endpoint:** `/projects/:id`

**Authentication:** Required

Example:

```text
DELETE /projects/1
```

Deleting a project also deletes its associated tasks.

---

# 3. Task APIs

## Get All Tasks

**Method:** GET

**Endpoint:** `/tasks`

**Authentication:** Required

### Search

```text
GET /tasks?search=login
```

### Filter by Status

```text
GET /tasks?status=Pending
```

### Filter by Priority

```text
GET /tasks?priority=High
```

### Multiple Filters

```text
GET /tasks?search=login&status=Pending&priority=High
```

---

## Get Task by ID

**Method:** GET

**Endpoint:** `/tasks/:id`

**Authentication:** Required

Example:

```text
GET /tasks/1
```

---

## Create Task

**Method:** POST

**Endpoint:** `/tasks`

**Authentication:** Required

### Request Body

```json
{
  "projectId": 1,
  "taskName": "Create Login Page",
  "description": "Develop the login interface",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2026-09-20"
}
```

### Allowed Priority

* Low
* Medium
* High

### Allowed Status

* Pending
* In Progress
* Completed

---

## Update Task

**Method:** PUT

**Endpoint:** `/tasks/:id`

**Authentication:** Required

Example:

```text
PUT /tasks/1
```

---

## Delete Task

**Method:** DELETE

**Endpoint:** `/tasks/:id`

**Authentication:** Required

Example:

```text
DELETE /tasks/1
```

---

# 4. Dashboard API

## Get Dashboard Statistics

**Method:** GET

**Endpoint:** `/dashboard`

**Authentication:** Required

### Response

```json
{
  "success": true,
  "dashboard": {
    "totalProjects": 5,
    "totalTasks": 15,
    "completedTasks": 6,
    "pendingTasks": 7,
    "projectsInProgress": 2
  }
}
```

---

# 5. HTTP Status Codes

| Status Code | Meaning                                  |
| ----------- | ---------------------------------------- |
| 200         | Request successful                       |
| 201         | Resource created                         |
| 400         | Validation error                         |
| 401         | Authentication required or invalid token |
| 404         | Resource not found                       |
| 409         | Duplicate email                          |
| 500         | Internal server error                    |

---

# 6. Security

* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Protected APIs require authentication.
* Users can access only their own projects and tasks.
* Input validation is implemented using express-validator.
* SQL queries use parameterized values.
* Authentication endpoints use rate limiting.
* Environment variables are stored in `.env`.
* `.env` is excluded from GitHub using `.gitignore`.

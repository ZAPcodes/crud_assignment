# Zelantrix Internship Assignment - User Management API

This project is a RESTful API developed for the **Zelantrix Backend Developer Intern Assignment**. It provides CRUD operations for managing users, with features like soft deletion, pagination, filtering, validation, and Dockerization for easy deployment.

## Project Overview
The backend is built with **Node.js and Express**, managing user data stored in **MongoDB**.

### Key Features
- **CRUD Operations**: Create, read, update, and soft delete users.
- **Pagination**: Retrieve users in pages (`?page=1&limit=10`).
- **Filtering**: Filter users by name, email, and roles (`?name=john&email=example`).
- **Validation**: Uses **Joi** for input validation.
- **Soft Deletion**: Users are marked inactive instead of being permanently deleted.
- **Dockerized**: Runs inside a Docker container with MongoDB as a service.

## Tech Stack
### Backend:
- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Validation**: Joi
- **Utilities**: Custom `ApiError` and `ApiResponse` classes
- **Containerization**: Docker

### Tools:
- **Docker Compose**: Manages backend and MongoDB services
- **Git**: Version control

## File Structure
```
backend/
│-- src/                 # Backend source code (controllers, routes, models, etc.)
│-- Dockerfile           # Defines the Docker image for the backend
│-- docker-compose.yml   # Manages backend and MongoDB services
│-- .gitignore           # Ignores unnecessary files (e.g., node_modules/, .env)
│-- .dockerignore        # Prevents unnecessary files from being copied into the Docker image
│-- .env                 # Environment variables (not tracked in Git)
│-- package.json         # Backend dependencies and scripts
```

## Prerequisites
- **Node.js** (v16 or higher) - Required for local development (without Docker)
- **MongoDB** - Needed if not using Docker
- **Docker** - Required for a containerized setup
- **Docker Compose** - Recommended for managing services
- **Git** - For cloning the repository

## Setup Instructions
### Local Setup (Without Docker)
#### 1. Clone the Repository
```bash
   git clone <repository-url>
   cd backend
```

## API Endpoints
### Base URL: `http://localhost:3000/api/v1`

### 1. Create a User
- **Method**: `POST`
- **Endpoint**: `/create`
- **Description**: Creates a new user.
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": 1234567890,
  "age": 25,
  "roles": "user"
}
```
- **Response (Success)**:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "605c72ef1e3b2c1f5c8e4b1a",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": 1234567890,
    "age": 25,
    "roles": "user",
    "is_active": true,
    "createdAt": "2025-03-20T10:00:00Z",
    "updatedAt": "2025-03-20T10:00:00Z"
  },
  "message": "User successfully registered",
  "success": true
}
```
- **Error Response**:
```json
{
  "statusCode": 409,
  "message": "User already exists",
  "success": false
}
```

### 2. Get All Users
- **Method**: `GET`
- **Endpoint**: `/get-all-user`
- **Description**: Retrieves a paginated and filtered list of active users.
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `name` (optional): Filter by name (partial match)
  - `email` (optional): Filter by email (partial match)
  - `roles` (optional): Filter by role (exact match)
- **Example Request**: `GET /get-all-user?page=1&limit=5&name=john`
- **Response (Success)**:
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "_id": "605c72ef1e3b2c1f5c8e4b1a",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": 1234567890,
        "age": 25,
        "roles": "user",
        "is_active": true
      }
    ],
    "total": 1,
    "page": 1,
    "pages": 1
  },
  "message": "Users retrieved successfully",
  "success": true
}
```
- **Error Response**:
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "success": false
}
```

### 3. Get Single User
- **Method**: `GET`
- **Endpoint**: `/get-single-user/:id`
- **Description**: Retrieves a user by ID.
- **Example Request**: `GET /get-single-user/605c72ef1e3b2c1f5c8e4b1a`
- **Response (Success)**:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "605c72ef1e3b2c1f5c8e4b1a",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": 1234567890,
    "age": 25,
    "roles": "user",
    "is_active": true
  },
  "message": "User found",
  "success": true
}
```
- **Error Response**:
```json
{
  "statusCode": 404,
  "message": "No user found",
  "success": false
}
```

### 4. Update a User
- **Method**: `PATCH`
- **Endpoint**: `/update/:id`
- **Description**: Updates a user’s details (partial update).
- **Request Body**:
```json
{
  "email": "john.doe@example.com"
}
```
- **Response (Success)**:
```json
{
  "statusCode": 200,
  "message": "User data successfully updated",
  "success": true
}
```
- **Error Response**:
```json
{
  "statusCode": 404,
  "message": "No user found",
  "success": false
}
```

### 5. Delete a User (Soft Delete)
- **Method**: `DELETE`
- **Endpoint**: `/delete/:id`
- **Description**: Marks a user as inactive instead of deleting permanently.
- **Response (Success)**:
```json
{
  "statusCode": 200,
  "message": "User deleted successfully",
  "success": true
}
```
- **Error Response**:
```json
{
  "statusCode": 404,
  "message": "No user found",
  "success": false
}
```


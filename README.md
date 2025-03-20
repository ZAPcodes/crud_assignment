# Zelantrix Internship Assignment - User Management API

This project is a RESTful API with a React frontend, built for the Zelantrix Backend Developer Intern Assignment. It provides CRUD operations for managing users, with additional features like soft deletion, pagination, filtering, and Dockerization for easy deployment.

## Project Overview
The backend is a Node.js/Express API that manages user data stored in MongoDB. 
Key features include:
- **CRUD Operations**: Create, read, update, and delete (soft delete) users.
- **Pagination**: Retrieve users in pages (`?page=1&limit=10`).
- **Filtering**: Filter users by name, email, and roles (`?name=john&email=example`).
- **Validation**: Uses Joi for input validation.
- **Dockerized**: Backend runs in a container with MongoDB as a service.

## Tech Stack
- **Backend**:
  - Framework: Node.js with Express
  - Database: MongoDB with Mongoose
  - Validation: Joi
  - Utilities: Custom `ApiError` and `ApiResponse` classes
  - Containerization: Docker
- **Tools**:
  - Docker Compose for managing services
  - Git for version control

## File Structure
- `backend/`
  - `src/`: Contains backend source code (controllers, routes, models, etc.).
  - `Dockerfile`: Defines the Docker image for the backend.
  - `docker-compose.yml`: Manages the app and MongoDB services.
  - `.gitignore`: Ignores unnecessary files (e.g., `node_modules/`, `.env`).
  - `.dockerignore`: Prevents unnecessary files from being copied into the Docker image.
  - `.env`: Environment variables (not tracked in Git).
  - `package.json`: Backend dependencies and scripts.

## Prerequisites
- **Node.js** (v16 or higher) - For local development without Docker
- **MongoDB** - Optional if not using Docker
- **Docker** - Required for containerized setup
- **Docker Compose** - Recommended for managing services
- **Git** - For cloning the repository

## Setup Instructions

### Local Setup (Without Docker)
#### Backend
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd backend
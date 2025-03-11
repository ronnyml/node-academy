# Node Academy API

Node Academy is a RESTful API built with Express and TypeScript, designed to power an e-learning platform. It provides endpoints for user authentication, course management, and other educational features, leveraging a modern stack for security, performance, and scalability.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)

## Features
- User authentication and authorization (JWT-based)
- Course and content management for e-learning
- Secure API endpoints with rate limiting and helmet
- Database integration with Prisma ORM
- API documentation via Swagger
- Logging with Winston
- Optimized performance with compression

## Tech Stack
- Node.js: JavaScript runtime for server-side logic
- Express: Web framework for building RESTful APIs
- TypeScript: Static typing for improved code quality and maintainability
- Prisma: ORM for database interactions

## Dependencies
The following libraries are used in Node Academy to enhance functionality, security, and developer experience:

- `@prisma/client`: Prisma client for type-safe database queries and schema management, used to interact with the database for storing users, courses, and other e-learning data.
- `bcrypt`: Password hashing library to securely store user passwords in the database.
- `compression`: Middleware to compress HTTP responses, reducing payload size and improving API performance for e-learning content delivery.
- `express-rate-limit`: Rate limiting middleware to prevent abuse and DDoS attacks on the API, protecting user access and course endpoints.
- `helmet`: Security middleware that sets HTTP headers to protect against common web vulnerabilities, ensuring a safe e-learning environment.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens (JWT) for user authentication and session management.
- `swagger-jsdoc`: Generates Swagger API documentation from JSDoc comments, making it easy to document and explore the e-learning API.
- `swagger-ui-express`: Serves Swagger UI for interactive API documentation, allowing developers and users to test endpoints directly.
- `uuid`: Generates unique identifiers, useful for creating unique course IDs, user sessions, or other resources in the platform.
- `winston`: Logging library for tracking API events, errors, and usage analytics, critical for debugging and monitoring the e-learning platform.

## Project Structure

- `prisma/`: Contains the Prisma schema (`schema.prisma`) defining the database structure for users, courses, and other entities.
- `src/app.ts`: Sets up the Express application with middleware and routes.
- `src/config/`: Houses configuration settings like DB access, logger, swagger.
- `src/controllers/`: Defines logic to handle HTTP requests and responses.
- `src/middlewares/`: Custom middleware for authentication, rate limiting, etc.
- `src/routes/`: Organizes API endpoints (e.g., `/users`, `/courses`).
- `src/server.ts`: Entry point to start the server and connect to the database.
- `src/services/`: Encapsulates business logic, interacting with the database via Prisma.
- `src/types/`: Custom TypeScript types for type safety across the project.
- `src/utils/`: Reusable utilities like password hashing and JWT handling.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ronnyml/node-academy.git
   cd node-academy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (e.g., in a `.env` file):
   ```
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-jwt-secret"
   JWT_EXPIRES_IN="1h"
   PORT=3000
   ```
4. Initialize the database with Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## Usage
- Access the API at `http://localhost:3000` (or your configured port).
- Explore the API documentation at `/api-docs` (served by Swagger UI).
- Example endpoints:
  - `POST /api/v1/auth/login`: Authenticate and receive a JWT.
  - `GET /api/v1/courses`: Retrieve available courses (protected route).

---

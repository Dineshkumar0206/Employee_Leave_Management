# Employee Leave Management System (ELMS) 🚀

A full-stack employee leave management application built with React, Spring Boot, and MySQL. It provides a simple and secure workflow for employee registration, login, leave application, leave tracking, and administrative leave management.

## ✨ Features

- User registration and login
- JWT-based authentication and authorization
- Apply for leave requests
- View personal leave history
- Manage leave requests from an admin-style dashboard
- Leave balance validation and exception handling
- REST API support for frontend integration
- Postman collection included for API testing

## 🧱 Tech Stack

- Frontend: React.js + Vite
- Backend: Java 25 + Spring Boot 4 + Spring Security
- Database: MySQL + Spring Data JPA
- Authentication: JWT

## 🏗️ Project Structure

- backend/: Spring Boot REST API
- frontend/: React frontend application
- ELMS_Postman_Collection.json: API test collection

## ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

- Java 25+
- Maven or the Maven wrapper
- Node.js and npm
- MySQL Server

## 🛠️ Setup Instructions

### 1. Create the database

Open MySQL and run:

```sql
CREATE DATABASE Employee_Management;
```

If your MySQL credentials differ from the defaults in the backend configuration, update the values in [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties).

### 2. Run the backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on:

- http://localhost:8080

### 3. Run the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

- http://localhost:5173

## 🔐 Security

- Passwords are hashed using BCrypt
- JWT tokens are used for stateless authentication
- CORS is configured for frontend communication

## 🧪 API Testing

A Postman collection is available at [ELMS_Postman_Collection.json](ELMS_Postman_Collection.json). Import it into Postman to quickly test the authentication and leave-management APIs.

## 📌 Notes

This project is designed as a practical full-stack example for employee leave management and can be extended with approval workflows, email notifications, and role-based access control.

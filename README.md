# Employee Leave Management System (ELMS) 🚀

This is a production-quality, MNC-level full-stack application built for managing employee leave requests.

## 🏗️ Project Architecture

The application follows a strictly decoupled layered architecture:
- **Frontend**: React.js + Vite + Bootstrap 5 (Client-Side Rendering)
- **Backend**: Java 17 + Spring Boot 3 (REST APIs)
- **Database**: MySQL with Spring Data JPA (Hibernate)
- **Security**: Stateless JSON Web Tokens (JWT) + Spring Security 6

### Backend Layers
1. **Controllers (`com.elms.backend.controller`)**: Exposes REST endpoints. Handles HTTP Requests and Responses.
2. **Services (`com.elms.backend.service`)**: Core business logic (e.g., verifying leave balance). Uses the `@Transactional` annotation.
3. **Repositories (`com.elms.backend.repository`)**: Interfaces extending `JpaRepository` for seamless MySQL communication.
4. **DTOs (`com.elms.backend.dto`)**: Data Transfer Objects used to prevent exposing sensitive Database Entities to the client.
5. **Exceptions (`com.elms.backend.exception`)**: Global Exception Handling via `@RestControllerAdvice`.

---

## 🛠️ Setup Guide

### 1. Database Setup
Ensure you have MySQL installed and running on port 3306.
1. Open MySQL Workbench or your terminal.
2. Run: `CREATE DATABASE Employee_Management;`
3. Verify your credentials. The backend is currently configured to use `root` / `0206`. If this changes, update `elms-backend/src/main/resources/application.properties`.

### 2. Backend Setup (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd elms-backend
   ```
2. Build and run the Maven project:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(The backend will run on `http://localhost:8080`. Hibernate will automatically create the tables inside the `Employee_Management` database).*

### 3. Frontend Setup (React.js)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd elms-frontend
   ```
2. Install the dependencies (already done if you followed the AI assistant):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend will run on `http://localhost:5173` or `http://localhost:3000`).*

---

## 🔐 Security Details
- **Password Hashing**: BCrypt.
- **Token**: JWT signed with HS256 algorithm.
- **CORS**: Configured in `WebSecurityConfig.java` to allow requests from the React dev server.

## 🧪 API Testing
A Postman collection (`ELMS_Postman_Collection.json`) is included in the root directory. You can import this into Postman to instantly test Authentication and Leave APIs!

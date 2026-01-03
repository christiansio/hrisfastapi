# Application Analysis: Full-Stack HRIS

## 1. High-Level Purpose and Architecture

This document provides a unified analysis of the full-stack Human Resource Information System (HRIS). The application is designed to streamline and automate common HR processes such as attendance tracking and leave management through a modern, web-based interface.

The system follows a decoupled, service-oriented architecture:

-   **Backend**: A RESTful API built with **Python** and **FastAPI**. It is responsible for all business logic, data processing, user authentication, and communication with the database.
-   **Frontend**: A modern Single Page Application (SPA) built with **React** and **TypeScript**. It provides a dynamic and responsive user interface for all employee and manager interactions.
-   **Database**: A **PostgreSQL** database serves as the persistent data store for all application information, including user accounts, sessions, and HR records.
-   **Containerization**: The entire stack is containerized using **Docker** and orchestrated with **Docker Compose**. This ensures a consistent, reproducible environment for development and deployment, bundling the backend, frontend, and database into a single, manageable unit.

---

## 2. Core Features (End-to-End Workflow)

This section describes the application's main features by tracing the flow of data and interaction between the frontend and backend.

### 2.1. Authentication and Session Management

The application features a secure, session-based authentication system.

-   **User Login**:
    1.  **Frontend (`pages/Login.tsx`)**: The user submits their email and password through a login form.
    2.  **Frontend (`auth/AuthContext.tsx`)**: The `login` function is called, which makes a `POST` request to the backend's `/auth/login` endpoint using `axios`.
    3.  **Backend (`AuthController.py`)**: The `/login` endpoint receives the credentials. It hashes the provided password using `bcrypt` and compares it to the stored hash in the `users` table.
    4.  **Backend (`AuthController.py` & `Database.py`)**: Upon successful verification, a new session record is created in the `session` table, and a secure, `HttpOnly` cookie containing the `session_id` is set in the user's browser.
    5.  **Frontend (`AuthContext.tsx`)**: On a successful response, the frontend sets its internal `isAuthenticated` state to `true` and stores the user's data. The browser automatically handles the received cookie for subsequent requests.

-   **Session Verification & Protected Routes**:
    1.  **Frontend (`App.tsx` & `auth/ProtectedRoute.tsx`)**: When a user navigates to a protected route (e.g., `/`), the `ProtectedRoute` component checks if the user is authenticated via the `AuthContext`.
    2.  **Frontend (`auth/AuthContext.tsx`)**: On initial application load, a `verifySession` function calls the backend's `/auth/me` endpoint.
    3.  **Backend (`AuthController.py`)**: The `/me` endpoint is a protected route that depends on `get_current_user`. This dependency retrieves the `session_id` from the request cookie, looks it up in the database, and returns the associated user's data. If the session is invalid or not found, it returns a 401 Unauthorized error.
    4.  **Frontend (`ProtectedRoute.tsx`)**: If the user is not authenticated (either locally or because the `/me` check failed), they are automatically redirected to the `/login` page.

### 2.2. Employee Dashboard

This is the main landing page for authenticated users, providing an overview of key HR information.

-   **Frontend (`pages/DashboardPage.tsx`)**: This component renders the primary dashboard layout. It contains various sub-components to display:
    -   Clock-in/Clock-out status.
    -   Attendance metrics (overtime, undertime).
    -   Available leave credits.
    -   Lists of upcoming leaves and recent attendance logs.
-   **Backend Interaction**: The dashboard components will make API calls to dedicated backend endpoints (e.g., `/api/attendance/summary`, `/api/leaves/credits`) to fetch the data required for display. These backend endpoints will query the database and return the relevant information.

### 2.3. Leave Request Management

The application provides a system for managing leave requests.

-   **Frontend (`pages/RequestsPage.tsx`)**: This page features a tabbed interface for "Approvals" (for managers) and "My Requests" (for all employees).
    -   Users can view the status of their past requests.
    -   Approvers can see a list of pending requests with buttons to "Accept" or "Reject" them.
-   **Backend Interaction**: This feature will be supported by a set of RESTful endpoints on the backend, such as:
    -   `GET /api/requests`: To fetch a list of requests.
    -   `POST /api/requests`: To create a new leave request.
    -   `PUT /api/requests/{request_id}`: To update the status of a request (e.g., approve or reject).

---

## 3. Key Functions and Components Map

This table maps the core features to the specific code modules responsible for their implementation.

| Feature                      | Frontend Component / File                               | Backend Module / Endpoint                                        |
| ---------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| **App Initialization**       | `src/main.tsx`, `src/App.tsx`                           | `main.py` (FastAPI app creation, lifespan manager)               |
| **User Login**               | `pages/Login.tsx`, `auth/AuthContext.tsx`               | `AuthController.py` (`/login` endpoint)                          |
| **User Logout**              | `components/topbar/Topbar.tsx`, `auth/AuthContext.tsx`  | `AuthController.py` (`/logout` endpoint)                         |
| **Route Protection**         | `auth/ProtectedRoute.tsx`, `auth/AuthRedirectRoute.tsx` | `AuthController.py` (`/me` endpoint, `get_current_user` dep)   |
| **Global Auth State**        | `auth/AuthContext.tsx` (`useAuth` hook)                 | (N/A - State is managed via DB sessions)                         |
| **Main App Layout**          | `layouts/AppLayout.tsx`, `components/sidebar/Sidebar.tsx` | (N/A)                                                            |
| **Dashboard Page**           | `pages/DashboardPage.tsx`                               | API endpoints for fetching dashboard data (to be implemented)    |
| **Requests Page**            | `pages/RequestsPage.tsx`                                | API endpoints for managing leave requests (to be implemented)    |
| **Database Management**      | (N/A)                                                   | `Database.py` (Connection pooling, cursor management)            |
| **Initial Data Seeding**     | (N/A)                                                   | `seed.py` (Creates default admin user)                           |

---

## 4. Deployment and Environment

The application is designed to be deployed as a set of coordinated services using **Docker Compose**.

-   **`docker-compose.yml`**: This file is the single source of truth for orchestrating the application. It defines the four main services: `backend`, `frontend`, `db`, and `nginx`.
-   **Service Interaction**:
    -   The `frontend` service runs a Vite development server.
    -   The `backend` service runs the FastAPI application using Uvicorn.
    -   The `db` service runs a PostgreSQL container.
    -   The `nginx` service (optional, for production) would act as a reverse proxy, directing traffic to the appropriate service.
-   **Configuration**: Environment variables stored in `.env.*` files are used to configure the application without modifying the code. This includes database connection strings (`DATABASE_URL`), allowed frontend origins for CORS (`CORS_ORIGINS`), and API host/port details for the frontend (`VITE_API_HOST`, `VITE_API_PORT`).

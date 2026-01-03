# Codebase Analysis for 'backend'

This document provides a detailed technical analysis of the project's backend architecture, outlining the role of each file and the intricate connections between them. The system is a Python-based REST API built with the FastAPI framework, utilizing a PostgreSQL database for data persistence and Docker for containerization.

---

## `main.py`

### File Overview
This script is the primary entry point for the entire FastAPI application. Its main responsibilities are to initialize the application instance, configure global middleware (like CORS), integrate all API routers from other modules, and manage the application's lifecycle events, such as database connection pooling.

### Key Functions/Classes
-   **`lifespan(app: FastAPI)`**: An `asynccontextmanager` that hooks into FastAPI's startup and shutdown events.
    -   **On Startup**: It calls `Database.get_pool()` to initialize the PostgreSQL connection pool, making it ready for incoming requests.
    -   **On Shutdown**: It calls `Database.close_pool()` to gracefully close all database connections.
-   **`app = FastAPI(...)`**: The global FastAPI application instance is created and configured here. The `lifespan` manager is registered with it.
-   **`app.add_middleware(CORSMiddleware, ...)`**: Configures Cross-Origin Resource Sharing (CORS) to allow requests from specified frontend origins, which are loaded from the `CORS_ORIGINS` environment variable.
-   **`app.include_router(auth_router, ...)`**: This is a critical integration point. It incorporates all the API endpoints defined in `AuthController.py` into the main application, under the `/auth` path prefix.
-   **`@app.get("/")` & `@app.get("/health")`**: Basic endpoints for verifying that the API is running.

### Integration Mapping
-   **`Database.py`**: `main.py` directly imports the `Database` class. It uses it within the `lifespan` manager to control the database connection pool's lifecycle. It also uses it in the `/test-db` endpoint to verify connectivity.
-   **`AuthController.py`**: It imports `auth_router` and includes it in the `app`, effectively making all authentication routes defined in that file part of the application.
-   **Environment Files (`.env.*`)**: It reads the `CORS_ORIGINS` variable to configure its CORS middleware. The underlying `Database.py` module, which it calls, also depends on these files.
-   **`uvicorn`**: In a production or development setting (as seen in the `Dockerfile`), `uvicorn` is used to run the `app` object located within this `main.py` file.

---

## `AuthController.py`

### File Overview
This file is dedicated to handling all authentication and user management logic. It defines the API endpoints related to user registration, login, logout, and session verification. It encapsulates the core business logic for user identity, relying on the `Database` module for persistence.

### Key Functions/Classes
-   **`auth_router = APIRouter()`**: An instance of a FastAPI router where all authentication-related endpoints are defined. This router is then exported to be consumed by `main.py`.
-   **Pydantic Models (`RegisterRequest`, `LoginRequest`, `UserResponse`, etc.)**: These classes define the expected data shapes for API requests and responses, ensuring data validation and serialization.
-   **`hash_password()` & `verify_password()`**: Helper functions that use the `bcrypt` library to securely hash and verify user passwords.
-   **`get_user_from_session()`**: A helper that queries the database to retrieve a user's details based on a given session ID.
-   **`get_current_user()`**: A FastAPI dependency that uses the `session_id` cookie to authenticate a user for protected endpoints. It leverages `get_user_from_session()` and raises a 401 Unauthorized exception if the session is invalid.
-   **Endpoints (`/register`, `/login`, `/logout`, `/me`)**:
    -   `/register`: Inserts a new user into the database after hashing their password.
    -   `/login`: Verifies user credentials, creates a session in the database, and sets a secure, `httponly` `session_id` cookie on the client's browser.
    -   `/logout`: Deletes the user's session from the database and clears the client-side cookie.
    -   `/me`: A protected endpoint that uses the `get_current_user` dependency to return the current authenticated user's information.

### Integration Mapping
-   **`main.py`**: `AuthController.py` provides its `auth_router` to `main.py`, which integrates it into the main application. This is its primary point of export.
-   **`Database.py`**: This is a critical dependency. `AuthController.py` imports the `Database` class and uses its `get_cursor()` context manager in every endpoint to execute raw SQL queries against the `users` and `session` tables.

---

## `Database.py`

### File Overview
This module acts as a centralized, thread-safe utility for managing all interactions with the PostgreSQL database. Its purpose is to abstract away the complexities of connection pooling and cursor management, providing a simple and reliable interface for other parts of the application to use. It also handles environment-specific database configuration.

### Key Functions/Classes
-   **Environment Loading**: The module checks the `ENV` environment variable. Based on its value (`production` or `development`), it loads the corresponding `.env.production` or `.env.development` file using `python-dotenv`.
-   **`Database` class**: A class that encapsulates all database-related functionality.
    -   **`_connection_pool`**: A class-level variable holding the `psycopg2` connection pool instance.
    -   **`get_pool()`**: A class method that initializes a `SimpleConnectionPool` using credentials from the loaded environment variables. It's designed as a singleton; the pool is only created on the first call.
    -   **`get_connection()`**: A context manager that safely gets a connection from the pool and ensures it's returned, preventing connection leaks.
    -   **`get_cursor(commit=False)`**: The primary interface for the application. It's a context manager that builds on `get_connection()`, provides a database cursor for executing queries, and handles transaction management (commit or rollback).
    -   **`close_pool()`**: A method to shut down all connections in the pool, called during application shutdown.

### Integration Mapping
-   **Environment Files (`.env.*`)**: `Database.py` directly reads these files to get the `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASS` required for the connection string.
-   **`main.py`**: Consumes `Database.py` to manage the connection pool's lifecycle (`get_pool`, `close_pool`).
-   **`AuthController.py`**: Imports the `Database` class and uses `Database.get_cursor()` extensively to perform all its database operations.
-   **`seed.py`**: Imports the `Database` class and uses `Database.get_cursor()` to insert the initial admin user into the database.

---

## `seed.py`

### File Overview
This is a standalone utility script for populating the database with initial data. Its primary function is to create a default "admin" user if one does not already exist, ensuring that the system is in a known state after setup.

### Integration Mapping
-   **`Database.py`**: It depends on the `Database` module to get a database connection and execute the `INSERT` statement for the admin user.
-   It is not directly part of the FastAPI application flow and is intended to be run manually from the command line (e.g., `python seed.py`) during development or deployment setup.

---

## `requirements.txt`

### File Overview
This file is the standard Python project manifest for dependencies. It lists all external packages required for the application to run. The `pip` package manager uses this file to install the exact versions of libraries needed.

### Key Libraries
-   **`fastapi`**: The core web framework.
-   **`uvicorn`**: The ASGI server that runs the FastAPI application.
-   **`psycopg2-binary`**: The PostgreSQL database adapter for Python.
-   **`python-dotenv`**: Used by `Database.py` to load configuration from `.env` files.
-   **`bcrypt`**: Used by `AuthController.py` for password hashing.

### Integration Mapping
-   This file is a foundational dependency for the entire project. It is used by `pip` during the setup phase, as defined in the `Dockerfile`, to create the correct runtime environment.

---

## `Dockerfile`

### File Overview
The `Dockerfile` contains the build instructions for creating a portable, containerized image of the application. It defines the complete environment, from the base operating system and Python version to the final command that starts the application server.

### Key Instructions
-   **`FROM python:3.10-slim`**: Specifies the base image, providing a lightweight Python environment.
-   **`COPY requirements.txt .` & `RUN pip install ...`**: An optimized step to install dependencies. By copying and installing `requirements.txt` first, Docker can cache this layer, avoiding re-installation on every code change.
-   **`COPY . .`**: Copies the entire application source code into the container.
-   **`EXPOSE 8000`**: Informs Docker that the application will listen on port 8000.
-   **`CMD ["uvicorn", "main:app", ...]`**: The final command to execute when a container is started. It tells `uvicorn` to run the `app` object found in the `main.py` file and to listen for requests on all network interfaces (`0.0.0.0`).

### Integration Mapping
-   **`main.py`**: The `CMD` instruction directly targets the `app` object inside `main.py` as the application to run.
-   **`requirements.txt`**: Used by the `RUN pip install` command to provision the container with the necessary Python libraries.

---

## `.env.development` & `.env.production`

### File Overview
These files store environment-specific configurations. They allow the application to behave differently in development versus production without changing the source code. This typically includes database credentials, API keys, and other sensitive or environment-dependent settings.

### Integration Mapping
-   **`Database.py`**: This is the primary consumer of these files. It reads the `DATABASE_URL` and other `DB_*` variables to configure its connection pool. It dynamically chooses which file to load based on the `ENV` system environment variable.
-   **`main.py`**: Reads the `CORS_ORIGINS` variable from these files to configure which frontend URLs are allowed to access the API.
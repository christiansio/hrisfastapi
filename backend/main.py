"""
Main application entry point.
This file creates the single FastAPI application instance and
coordinates all routers and configuration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

# Import the lifespan manager from Database.py
from Database import Database

# Import the router from the refactored AuthController.py
from AuthController import auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager to handle application startup and shutdown.
    Initializes the database pool on startup and closes it on shutdown.
    """

    # Startup: Initialize database pool
    Database.get_pool() # This creates the connection pool
    print("Application started")

    yield # Application runs here

    # Shutdown: Close database pool
    Database.close_pool()
    print("Application shutdown")

# Create the single, unified FastAPI application
app = FastAPI(
    title="Your API",
    description="API with authentication",
    version="1.0.0",
    lifespan=lifespan
)

# Your frontend URL
origins =  os.getenv("CORS_ORIGINS", "").split(",")

# Configure CORS middleware (moved from AuthController.py)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, #  Required for cookies/sessions
    allow_methods=["*"], # Allow all HTTP methods
    allow_headers=["*"], # Allow all headers
)

# Include the authentication router
# The prefix parameter adds "/auth" to all routes in this router
# So /register becomes /auth/register, etc.
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

# You can add a root endpoint here if needed
@app.get("/")
async def root():
    return {"message": "FastAPI with PostgreSQL"}

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint to verify the API is running."""
    return {"status": "healthy", "message": "API is running"}

@app.get("/test-db")
async def test_database():
    """
    Tests the database connection by executing a simple query (SELECT version()).
    Returns the database version or an error message.
    """
    try:
        # Use the context manager to automatically handle connection and cursor
        with Database.get_cursor() as cursor:
            cursor.execute("SELECT version();")
            return{"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

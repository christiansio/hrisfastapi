from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import psycopg2
from psycopg2 import pool
from contextlib import asynccontextmanager
from contextlib import contextmanager
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Initialize the FastAPI application
app = FastAPI()

# Define allowed origins for CORS
origins = [
    "http://localhost:5173",
]

# Add CORS middleware to allow cross-origin requests from the specified frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,          # Required if using cookies/sessions
    allow_methods=["*"],             # Allow all HTTP methods
    allow_headers=["*"],             # Allow all headers
)

class Database:
    """
    A class to manage PostgreSQL database connections using a connection pool
    for efficient and thread-safe access within the FastAPI application.
    """
    _connection_pool = None

    @classmethod
    def get_pool(cls):
        """
        Initializes and returns the psycopg2 SimpleConnectionPool.
        Uses environment variables for connection parameters.
        Raises an exception if the initial connection fails.
        """
        if cls._connection_pool is None:
            try:
                cls._connection_pool = psycopg2.pool.SimpleConnectionPool(
                    1,  # minimum connections
                    20,  # maximum connections
                    host=os.getenv('DB_HOST'),
                    port=os.getenv('DB_PORT'),
                    database=os.getenv('DB_NAME'),
                    user=os.getenv('DB_USER'),
                    password=os.getenv('DB_PASS')
                )
            except psycopg2.Error as e:
                raise Exception(f"Connection failed: {e}")
        
        return cls._connection_pool

    @classmethod
    @contextmanager
    def get_connection(cls):
        """
        A context manager that retrieves a connection from the pool,
        yields it for use, and ensures it is returned to the pool afterwards.
        """
        pool = cls.get_pool()
        conn = pool.getconn()
        try:
            yield conn
        finally:
            pool.putconn(conn)

    @classmethod
    @contextmanager
    def get_cursor(cls, commit=False):
        """
        A context manager that provides a database cursor.
        It automatically manages the connection lifecycle (get/put) and the cursor.
        It commits the transaction if 'commit' is True, otherwise it rolls back on exception.
        
        :param commit: If True, commits the transaction upon successful completion.
        """
        with cls.get_connection() as conn:
            cursor = conn.cursor()
            try:
                yield cursor
                if commit:
                    conn.commit()
            except Exception as e:
                conn.rollback()
                raise e
            finally:
                cursor.close()


# Example usage in a FastAPI route
@app.get("/")
async def root():
    """Returns a simple welcome message for the root endpoint."""
    return {"message": "FastAPI with PostgreSQL"}


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
            version = cursor.fetchone()
            return {"status": "success", "database_version": version[0]}
    except Exception as e:
        return {"status": "error", "message": str(e)}


# Optional: Close pool on shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    A lifespan context manager to handle application startup and shutdown events.
    It ensures the database connection pool is closed when the application shuts down.
    """
    # Startup: Could initialize database pool here if needed
    yield
    # Shutdown: Close database pool
    if Database._connection_pool:
        Database._connection_pool.closeall()

# Set the lifespan context manager for the application
app.router.lifespan_context = lifespan

if __name__ == "__main__":
    import uvicorn
    # Run the application using uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
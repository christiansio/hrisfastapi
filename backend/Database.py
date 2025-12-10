from fastapi import FastAPI
import psycopg2
from psycopg2 import pool
from contextlib import asynccontextmanager
from contextlib import contextmanager
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

app = FastAPI()


class Database:
    _connection_pool = None

    @classmethod
    def get_pool(cls):
        """Initialize and return the connection pool"""
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
        """Get a connection from the pool"""
        pool = cls.get_pool()
        conn = pool.getconn()
        try:
            yield conn
        finally:
            pool.putconn(conn)

    @classmethod
    @contextmanager
    def get_cursor(cls, commit=False):
        """Get a cursor with automatic connection management"""
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
    return {"message": "FastAPI with PostgreSQL"}


@app.get("/test-db")
async def test_database():
    """Test database connection"""
    try:
        with Database.get_cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            return {"status": "success", "database_version": version[0]}
    except Exception as e:
        return {"status": "error", "message": str(e)}


# Optional: Close pool on shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events"""
    # Startup: Could initialize database pool here if needed
    yield
    # Shutdown: Close database pool
    if Database._connection_pool:
        Database._connection_pool.closeall()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
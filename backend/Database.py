
"""
Database utility module.
This module provides database connection management and operations.
It should NOT contain any FastAPI application or routes.
"""

import psycopg2
from psycopg2 import pool
from contextlib import contextmanager
from dotenv import load_dotenv
import os

# Check the "master" environment variable (set via 'export' or terminal)
env_state = os.getenv("ENV", "development")

if env_state == "production":
    load_dotenv(".env.production")
else:
    load_dotenv(".env.development")

print(f"--- Currently running in {env_state} mode ---")

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

    @classmethod
    def close_pool(cls):
        """
        Closes all connections in the pool.
        This should be called during application shutdown.
        """
        if cls._connection_pool:
            cls._connection_pool.closeall()
            print("Database connection pool closed")

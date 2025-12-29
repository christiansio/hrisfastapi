

from fastapi import APIRouter, Response, Cookie, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr


from typing import Optional
from Database import Database

import bcrypt
import uuid 
from uuid import UUID
from typing import Literal

auth_router = APIRouter()

# Request Models
class RegisterRequest(BaseModel):
    """Pydantic model for user registration request data."""
    email: EmailStr
    password: str
    role: str = "user"


class LoginRequest(BaseModel):
    """Pydantic model for user login request data."""
    email: EmailStr
    password: str


# Response Models
class UserResponse(BaseModel):
    """Pydantic model for returning basic user information."""
    id: UUID
    email: str
    role: Literal['admin', 'approver', 'user'] = "user"


class LoginResponse(BaseModel):
    """Pydantic model for successful login response, including session details."""
    message: str
    user: dict
    sessionId: str


# Helper Functions
def hash_password(password: str) -> str:
    """
    Hashes the given plaintext password using bcrypt.
    
    :param password: The plaintext password string.
    :return: The hashed password string.
    """
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password: str, password_hash: str) -> bool:
    """
    Verifies a plaintext password against a stored bcrypt hash.
    
    :param password: The plaintext password string.
    :param password_hash: The stored hashed password string.
    :return: True if the passwords match, False otherwise.
    """
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def get_user_from_session(session_id: Optional[str]) -> Optional[dict]:
    """
    Retrieves user information from the database using the session ID.
    Performs a JOIN between the 'session' and 'users' tables.
    
    :param session_id: The unique ID of the session.
    :return: A dictionary containing user 'id' and 'email' or None if the session is invalid.
    """
    if not session_id:
        return None
    
    try:
        with Database.get_cursor() as cursor:
            cursor.execute("""
                SELECT users.id, users.email, users.role 
                FROM session 
                JOIN users ON session.user_id = users.id 
                WHERE session.id = %s
            """, (session_id,))
            result = cursor.fetchone()
            
            if result:
                return {
                        "id": result[0],
                        "email": result[1],
                        "role" : result[2]
                    }
            
            return None
    except Exception:
        # Log the error here in a real application
        return None


def get_current_user(session_id: Optional[str] = Cookie(None, alias="session_id")):
    """
    FastAPI dependency function to authenticate the user based on the 'session_id' cookie.
    
    :param session_id: Automatically extracted from the "session_id" cookie.
    :raises HTTPException 401: If the session ID is missing or invalid.
    :return: A dictionary containing the authenticated user's id and email.
    """
    user = get_user_from_session(session_id)
    if not user:
        # Raise 401 if no valid user is found for the session
        raise HTTPException(status_code=401, detail="unauthorized")
    return user


# Routes
@auth_router.post("/register")
async def register(data: RegisterRequest):
    """
    Registers a new user: hashes the password and inserts a new row into the 'users' table.
    
    :param data: The request body containing email, password, and role.
    :raises HTTPException 400: If the email already exists (duplicate key error).
    """
    try:
        password_hash = hash_password(data.password)
        
        # Insert user data and commit the transaction
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute("""
                INSERT INTO users (email, password_hash, role) 
                VALUES (%s, %s, %s)
            """, (data.email, password_hash, data.role))
        
        return {"message": "registered", "email": data.email, "role": data.role}
    
    except Exception as e:
        # Check for PostgreSQL duplicate key error
        if "duplicate key" in str(e).lower():
            raise HTTPException(status_code=400, detail="email_already_exists")
        raise HTTPException(status_code=500, detail=str(e))


@auth_router.post("/login", response_model=LoginResponse)
async def login(
    data: LoginRequest, 
    response: Response,
    session_id: Optional[str] = Cookie(None, alias="session_id")
):
    """
    Handles user login: verifies credentials, creates or reuses a session, and sets the 'session_id' cookie.
    
    :param data: The request body containing email and password.
    :param response: The FastAPI Response object to set the cookie.
    :param session_id: Optional existing session ID from the cookie.
    :raises HTTPException 401: If credentials are invalid.
    """
    try:
        # Check if user already has a valid session from the cookie
        if session_id:
            existing_user = get_user_from_session(session_id)
            if existing_user:
                # User already logged in, return existing session info
                return {
                    "message": "loggedIn",
                    "user": {
                        "id": existing_user["id"],
                        "email": existing_user["email"]
                    },
                    "sessionId": session_id
                }
        
        # 1. Get user from database
        with Database.get_cursor() as cursor:
            cursor.execute("""
                SELECT id, email, password_hash, role 
                FROM users 
                WHERE email = %s
            """, (data.email,))
            user = cursor.fetchone()
        
        # 2. Verify credentials
        if not user or not verify_password(data.password, user[2]):
            raise HTTPException(status_code=401, detail="invalid_credentials")
        
        user_id, email, _, role = user
        
        # 3. Check for active session
        with Database.get_cursor() as cursor:
            cursor.execute("""
                SELECT id FROM session 
                WHERE user_id = %s
                LIMIT 1
            """, (user_id,))
            existing_session = cursor.fetchone()
        
        if existing_session:
            # Reuse existing session ID
            session_id = existing_session[0]
        else:
            # Create new session and insert into 'session' table
            session_id = str(uuid.uuid4())
            
            with Database.get_cursor(commit=True) as cursor:
                cursor.execute("""
                    INSERT INTO session (id, user_id) 
                    VALUES (%s, %s)
                """, (session_id, user_id))
        
        # 4. Set the session cookie on the client
        response.set_cookie(
            key="session_id",
            value=session_id,
            max_age=86400,  # 24 hours in seconds
            httponly=True,  # Prevents client-side JS access
            samesite="lax",
            secure=False    # Set to True in production with HTTPS
        )
        
        return {
            "message": "ok",
            "user": {
                "id": user_id,
                "email": email,
                "role": role
            },
            "sessionId": session_id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        # Catch other database or unexpected errors
        raise HTTPException(status_code=500, detail=str(e))


@auth_router.get("/me", response_model=UserResponse)
async def me(current_user: dict = Depends(get_current_user)):
    """
    Protected endpoint to retrieve the current authenticated user's details.
    
    :param current_user: The authenticated user dictionary provided by the Depends(get_current_user).
    :return: The user ID and email.
    """
    return current_user


@auth_router.post("/logout")
async def logout(
    response: Response,
    session_id: Optional[str] = Cookie(None, alias="session_id")
):
    """
    Logs out the user by deleting the session from the database and clearing the client-side cookie.
    
    :param response: The FastAPI Response object to clear the cookie.
    :param session_id: Optional existing session ID from the cookie.
    """
    if not session_id:
        return {"message": "logged_out"}
    
    try:
        # Delete the session from the database
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute("DELETE FROM session WHERE id = %s", (session_id,))
        
        # Clear the client-side cookie by setting max_age to 0
        response.delete_cookie(key="session_id")
        
        return {"message": "logged_out"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

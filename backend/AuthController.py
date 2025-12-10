from fastapi import FastAPI, Response, Cookie, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
import bcrypt
import uuid 
from uuid import UUID
from Database import Database

app = FastAPI()

# Request Models
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    role: str = "user"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# Response Models
class UserResponse(BaseModel):
    id: UUID
    email: str


class LoginResponse(BaseModel):
    message: str
    user: dict
    sessionId: str


# Helper Functions
def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password: str, password_hash: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def get_user_from_session(session_id: Optional[str]) -> Optional[dict]:
    """Get user from session ID"""
    if not session_id:
        return None
    
    try:
        with Database.get_cursor() as cursor:
            cursor.execute("""
                SELECT users.id, users.email 
                FROM session 
                JOIN users ON session.user_id = users.id 
                WHERE session.id = %s
            """, (session_id,))
            result = cursor.fetchone()
            
            if result:
                return {"id": result[0], "email": result[1]}
            return None
    except Exception:
        return None


def get_current_user(session_id: Optional[str] = Cookie(None, alias="session_id")):
    """Dependency to get current user from cookie"""
    user = get_user_from_session(session_id)
    if not user:
        raise HTTPException(status_code=401, detail="unauthorized")
    return user


# Routes
@app.post("/register")
async def register(data: RegisterRequest):
    """Register a new user"""
    try:
        password_hash = hash_password(data.password)
        
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute("""
                INSERT INTO users (email, password_hash, role) 
                VALUES (%s, %s, %s)
            """, (data.email, password_hash, data.role))
        
        return {"message": "registered", "email": data.email, "role": data.role}
    
    except Exception as e:
        if "duplicate key" in str(e).lower():
            raise HTTPException(status_code=400, detail="email_already_exists")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/login", response_model=LoginResponse)
async def login(
    data: LoginRequest, 
    response: Response,
    session_id: Optional[str] = Cookie(None, alias="session_id")
):
    """Login user and create session"""
    try:
        # Check if user already has a valid session
        if session_id:
            existing_user = get_user_from_session(session_id)
            if existing_user:
                # User already logged in with valid session
                return {
                    "message": "ok",
                    "user": {
                        "id": existing_user["id"],
                        "email": existing_user["email"]
                    },
                    "sessionId": session_id
                }
        
        # Get user from database
        with Database.get_cursor() as cursor:
            cursor.execute("""
                SELECT id, email, password_hash, role 
                FROM users 
                WHERE email = %s
            """, (data.email,))
            user = cursor.fetchone()
        
        # Verify credentials
        if not user or not verify_password(data.password, user[2]):
            raise HTTPException(status_code=401, detail="invalid_credentials")
        
        user_id, email, _, role = user
        
        # Check if user already has an active session
        with Database.get_cursor() as cursor:
            cursor.execute("""
                SELECT id FROM session 
                WHERE user_id = %s
                LIMIT 1
            """, (user_id,))
            existing_session = cursor.fetchone()
        
        if existing_session:
            # Reuse existing session
            session_id = existing_session[0]
        else:
            # Create new session
            session_id = str(uuid.uuid4())
            
            with Database.get_cursor(commit=True) as cursor:
                cursor.execute("""
                    INSERT INTO session (id, user_id) 
                    VALUES (%s, %s)
                """, (session_id, user_id))
        
        # Set cookie
        response.set_cookie(
            key="session_id",
            value=session_id,
            max_age=86400,  # 24 hours
            httponly=True,
            samesite="strict",
            secure=False  # Set to True in production with HTTPS
        )
        
        return {
            "message": "ok",
            "user": {
                "id": user_id,
                "email": email
            },
            "sessionId": session_id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/me", response_model=UserResponse)
async def me(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    return current_user


@app.post("/logout")
async def logout(
    response: Response,
    session_id: Optional[str] = Cookie(None, alias="session_id")
):
    """Logout user and delete session"""
    if not session_id:
        return {"message": "logged_out"}
    
    try:
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute("DELETE FROM session WHERE id = %s", (session_id,))
        
        # Clear cookie
        response.delete_cookie(key="session_id")
        
        return {"message": "logged_out"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
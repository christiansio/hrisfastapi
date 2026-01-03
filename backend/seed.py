import os
import bcrypt
import psycopg2
from Database import Database  # Your existing helper

def hash_password(password: str) -> str:
    """
    Purpose: Hashes a plaintext password using bcrypt.
    Input:
        - password (str): The plaintext password string to be hashed.
    Output:
        - str: The bcrypt hashed password string.
    """
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password_bytes, salt).decode('utf-8')

def seed_admin():
    """
    Purpose: Seeds the database with a default administrator user.
    If an admin user with the specified email already exists, no changes are made.
    Input:
        - None.
    Output:
        - None. Prints messages to the console indicating the seeding process status (created, exists, or error).
    """
    admin_email = "admin@hris.com"
    admin_raw_password = "AdminPassword123"
    admin_role = "admin"
    
    # Hash using bcrypt directly
    password_hash = hash_password(admin_raw_password)

    print(f"--- Seeding Admin into PostgreSQL ---")
    
    try:
        # Matches your logic: with Database.get_cursor(commit=True)
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute("""
                INSERT INTO users (email, password_hash, role) 
                VALUES (%s, %s, %s)
                ON CONFLICT (email) DO NOTHING;
            """, (admin_email, password_hash, admin_role))
            
            if cursor.rowcount > 0:
                print(f"✅ Created: {admin_email}")
            else:
                print(f"ℹ️ Exists: {admin_email} (No changes made)")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    seed_admin()
"""
Authentication Router Module.

Handles user registration (signup) and login validation (signin) 
interacting with MongoDB users database and securing passwords using bcrypt.
"""

from fastapi import APIRouter, HTTPException
from app.schemas import UserSignup, UserLogin
from app.database import users_collection
import bcrypt

# Setup auth router config
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup")
def signup(user: UserSignup):
    """
    Register a new user account.
    Validates email uniqueness, hashes user password, and inserts record into MongoDB users collection.
    """
    # Check if a user with the provided email is already registered
    existing_user = users_collection.find_one(
        {"email": user.email}
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Secure user password by salt-hashing using bcrypt library
    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # Format user model document for database insertion
    new_user = {
        "name" : user.name,
        "email" : user.email,
        "password" : hashed_password.decode("utf-8")
    }

    # Insert record into MongoDB
    result = users_collection.insert_one(new_user)

    return {
        "message": "User created successfully",
        "user_id": str(result.inserted_id)
    }
 

@router.post("/signin")
def signin(user: UserLogin):
    """
    Authenticate user login credentials.
    Performs database email check and bcrypt cryptographically secure password match validation.
    """
    # Retrieve user document by email
    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    # Return standard generic error response if user does not exist (prevents user enumeration attacks)
    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Perform bcrypt secure comparison checking input password against hashed database password
    password_match = bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing_user["password"].encode("utf-8")
    )

    if not password_match:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Return success confirmation alongside serialized user public metadata
    return {
        "message": "Login successful",
        "user": {
            "id": str(existing_user["_id"]),
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }
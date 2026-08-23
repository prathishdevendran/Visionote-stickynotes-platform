"""
User Schemas Module.

Defines Pydantic models for user registration (signup) 
and user session login (signin) request validations.
"""

from pydantic import BaseModel, EmailStr

class UserSignup(BaseModel):
    """Schema for validating new user account registration requests."""
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    """Schema for validating user credential check/signin requests."""
    email: EmailStr
    password: str


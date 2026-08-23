"""
Main Application Entry Point.

Initializes the FastAPI application instance, configures Cross-Origin
Resource Sharing (CORS) policies, registers API routers, and defines the root endpoint.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.notes import router as notes_router
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()
if not os.getenv("ALLOWED_ORIGINS"):
    app_env = Path(__file__).parent / ".env"
    if app_env.exists():
        load_dotenv(dotenv_path=app_env)

# Parse allowed CORS origins
origins_str = os.getenv("ALLOWED_ORIGINS", "*")
origins = [origin.strip() for origin in origins_str.split(",") if origin.strip()]

# Initialize the core FastAPI app
app = FastAPI(
    title="Visionote API",
    description="Backend API for Visionote Sticky Notes Platform",
    version="1.0.0"
)

# CORS middleware configuration: enables the React frontend application (running on
# a separate port/origin) to successfully issue HTTP requests to this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, PUT, DELETE, OPTIONS, etc.
    allow_headers=["*"],  # Allows all headers (e.g., Content-Type, Authorization)
)

# Attach routers representing authentication and notes CRUD categories
app.include_router(auth_router)
app.include_router(notes_router)

@app.get("/")
def read_root():
    """
    Service Root Endpoint.
    Provides API welcome metadata and the interactive Swagger docs reference location.
    """
    return {
        "message": "Welcome to Visionote API",
        "docs": "/docs"
    }

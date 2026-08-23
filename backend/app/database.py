"""
Database Configuration Module.

Loads MongoDB connection settings from environment variables and 
initializes the PyMongo Client and database collection handlers.
"""

import os
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Try loading the default .env from the working directory
load_dotenv()

# Fallback: Locate and load the app/.env file if the environment variables 
# were not resolved (e.g., when launching the app from different working directories).
if not os.getenv("DATABASE_NAME"):
    app_env = Path(__file__).parent / ".env"
    if app_env.exists():
        load_dotenv(dotenv_path=app_env)

# Retrieve MongoDB connection credentials and settings
MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# Establish connection with the MongoDB server instance
client = MongoClient(MONGODB_URL)

# Reference the active database namespace
db = client[DATABASE_NAME]

# Define collections accessible across the backend API routers
users_collection = db["users"]
notes_collection = db["notes"]
"""
MongoDB database configuration.

Creates the MongoDB client and provides access to the
WorkforceDB database and employees collection.
"""

from pymongo import MongoClient

from app.config import (
    MONGODB_URI,
    MONGODB_SERVER_SELECTION_TIMEOUT_MS,
)

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is not configured in the environment")

# Create MongoDB client
client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=MONGODB_SERVER_SELECTION_TIMEOUT_MS,
)

# Access the Workforce database
db = client["WorkforceDB"]

# Access the employees collection
employees_collection = db["employees"]
"""
MongoDB database configuration.

Creates the MongoDB client and provides access to the
WorkforceDB database and employees collection.
"""

from pymongo import MongoClient
from app.config import MONGODB_URI

# Create a MongoDB client using the connection string
client = MongoClient(MONGODB_URI)

# Access the Workforce database
db = client["WorkforceDB"]

# Access the employees collection
employees_collection = db["employees"]
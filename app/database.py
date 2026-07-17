from pymongo import MongoClient
from app.config import MONGODB_URI

# Create MongoDB client
client = MongoClient(MONGODB_URI)

# Select database
db = client["WorkforceDB"]

# Select collection
employees_collection = db["employees"]
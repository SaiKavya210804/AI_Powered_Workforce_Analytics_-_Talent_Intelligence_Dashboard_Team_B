from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# MongoDB connection string
MONGODB_URI = os.getenv("MONGODB_URI")
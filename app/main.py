from fastapi import FastAPI
from app.database import employees_collection

app = FastAPI(
    title="AI-Powered Workforce Analytics & Talent Intelligence Dashboard",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to the AI-Powered Workforce Analytics API"
    }

@app.get("/test-db")
def test_database():
    count = employees_collection.count_documents({})
    return {
        "status": "Connected Successfully",
        "total_employees": count
    }
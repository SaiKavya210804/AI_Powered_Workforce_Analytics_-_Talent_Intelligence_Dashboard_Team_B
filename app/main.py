from fastapi import FastAPI
from app.routes import router

app = FastAPI(
    title="AI-Powered Workforce Analytics & Talent Intelligence Dashboard",
    version="1.0.0"
)

# Include all API routes
app.include_router(router)
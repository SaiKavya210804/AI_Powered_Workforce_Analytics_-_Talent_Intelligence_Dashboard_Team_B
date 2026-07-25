"""
Main entry point for the AI-Powered Workforce Analytics API.

Initializes the FastAPI application and registers all API routes.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router
from app.ai_routes import router as ai_router


# Create the FastAPI application
app = FastAPI(
    title="AI-Powered Workforce Analytics & Talent Intelligence Dashboard",
    description=(
        "REST API for workforce analytics, employee management, "
        "and HR insights using FastAPI and MongoDB."
    ),
    version="1.0.0",
)


# Allow frontend (React/Vite) to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register all API endpoints
app.include_router(router)
app.include_router(ai_router)
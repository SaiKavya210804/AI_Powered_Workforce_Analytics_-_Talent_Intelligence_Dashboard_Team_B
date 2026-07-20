"""
Main entry point for the AI-Powered Workforce Analytics API.

Initializes the FastAPI application and registers all API routes.
"""

from fastapi import FastAPI
from app.routes import router

# Create the FastAPI application
app = FastAPI(
    title="AI-Powered Workforce Analytics & Talent Intelligence Dashboard",
    description=(
        "REST API for workforce analytics, employee management, "
        "and HR insights using FastAPI and MongoDB."
    ),
    version="1.0.0",
)

# Register all API endpoints
app.include_router(router)
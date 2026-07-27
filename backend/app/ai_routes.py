"""
ai_routes.py
-------------
Adds an /ask-ai endpoint to your FastAPI app that answers natural
language questions about the workforce data using Snowflake and Gemini.
"""

import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

from app.snowflake_client import get_workforce_context_for_views

load_dotenv()

router = APIRouter()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Updated Gemini model
GEMINI_MODEL = "gemini-3.6-flash"


class AskAIRequest(BaseModel):
    question: str


VIEW_SELECTION_RULES = [
    (
        ("dashboard", "overview", "kpi", "summary", "overall"),
        ["dashboard_kpis", "attrition_summary", "department_summary"],
    ),
    (
        ("attrition", "leave", "leaving", "left", "resign", "turnover"),
        ["attrition_summary", "attrition_by_department", "department_summary"],
    ),
    (
        ("department", "team", "business unit"),
        ["department_summary", "attrition_by_department"],
    ),
    (
        ("gender", "male", "female"),
        ["gender_distribution"],
    ),
    (
        ("job role", "role", "designation", "position"),
        ["job_role_distribution"],
    ),
    (
        ("salary", "income", "pay", "compensation", "wage"),
        ["salary_analytics", "department_summary"],
    ),
    (
        ("age", "youngest", "oldest", "age group"),
        ["age_analytics", "age_distribution"],
    ),
    (
        ("wellbeing", "well-being", "satisfaction", "work-life", "work life", "balance"),
        ["employee_wellbeing", "job_satisfaction_summary", "work_life_balance_summary"],
    ),
    (
        ("experience", "years at company", "tenure"),
        ["experience_summary"],
    ),
]

FALLBACK_VIEWS = [
    "dashboard_kpis",
    "attrition_summary",
    "department_summary",
]


def _select_views_for_question(question: str):
    question_lower = question.lower()

    selected_views = []
    seen = set()

    for keywords, views in VIEW_SELECTION_RULES:
        if any(keyword in question_lower for keyword in keywords):
            for view in views:
                if view not in seen:
                    seen.add(view)
                    selected_views.append(view)

    if not selected_views:
        return FALLBACK_VIEWS

    return selected_views


@router.post("/ask-ai")
def ask_ai(payload: AskAIRequest):

    selected_views = _select_views_for_question(payload.question)

    try:
        context = get_workforce_context_for_views(selected_views)

    except Exception as e:
        print("\n========== SNOWFLAKE ERROR ==========")
        print(repr(e))
        print("=====================================\n")

        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch Snowflake data: {str(e)}",
        )

    prompt = f"""
You are an AI Workforce Analytics Assistant.

Use ONLY the workforce information provided below.

Answer clearly using markdown.

Data:
{context}

Question:
{payload.question}
"""

    try:

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )

        answer = response.text

    except Exception as e:

        print("\n========== GEMINI ERROR ==========")
        print(repr(e))
        print("==================================\n")

        raise HTTPException(
            status_code=500,
            detail=f"AI request failed: {str(e)}",
        )

    return {
        "question": payload.question,
        "answer": answer,
    }
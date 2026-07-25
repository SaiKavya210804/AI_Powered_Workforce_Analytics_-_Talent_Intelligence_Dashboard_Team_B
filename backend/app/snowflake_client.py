"""
snowflake_client.py
---------------------
Connects FastAPI to Snowflake so the backend can query the analytics
views built in Phase 5, and feed that data to an AI model for Phase 6.

Add these to your .env file:
    SNOWFLAKE_ACCOUNT=your_account_identifier   (e.g. CEB28612 or CEB28612.us-west-2.aws)
    SNOWFLAKE_USER=your_username
    SNOWFLAKE_PASSWORD=your_password
    SNOWFLAKE_WAREHOUSE=WORKFORCE_WH
    SNOWFLAKE_DATABASE=WORKFORCE_DB
    SNOWFLAKE_SCHEMA=ANALYTICS
"""

import os
from decimal import Decimal
import snowflake.connector
from dotenv import load_dotenv

load_dotenv()


def get_snowflake_connection():
    """Open a fresh connection to Snowflake using credentials from .env"""
    return snowflake.connector.connect(
        account=os.getenv("SNOWFLAKE_ACCOUNT"),
        user=os.getenv("SNOWFLAKE_USER"),
        password=os.getenv("SNOWFLAKE_PASSWORD"),
        warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
        database=os.getenv("SNOWFLAKE_DATABASE"),
        schema=os.getenv("SNOWFLAKE_SCHEMA"),
    )


def run_query(sql: str):
    """Run a SQL query against Snowflake and return rows as a list of dicts."""
    conn = get_snowflake_connection()
    try:
        cur = conn.cursor(snowflake.connector.DictCursor)
        cur.execute(sql)
        rows = cur.fetchall()
        return rows
    finally:
        conn.close()


def _first_row(sql: str):
    rows = run_query(sql)
    return rows[0] if rows else {}


def _as_int(value):
    if value is None:
        return 0
    if isinstance(value, Decimal):
        return int(value)
    return int(value)


def _as_float(value, digits: int = 2):
    if value is None:
        return 0.0
    if isinstance(value, Decimal):
        return round(float(value), digits)
    return round(float(value), digits)


def get_departments_data():
    rows = run_query("SELECT * FROM department_summary ORDER BY department")
    return [
        {
            "department": row["DEPARTMENT"],
            "employee_count": _as_int(row["EMPLOYEE_COUNT"]),
        }
        for row in rows
    ]


def get_attrition_data():
    row = _first_row("SELECT * FROM attrition_summary")
    attrition_yes = _as_int(row.get("ATTRITION_YES"))
    attrition_no = _as_int(row.get("ATTRITION_NO"))
    attrition_rate = _as_float(row.get("ATTRITION_RATE_PCT"), 2)
    return {
        "total_employees": attrition_yes + attrition_no,
        "employees_with_attrition": attrition_yes,
        "employees_without_attrition": attrition_no,
        "attrition_rate": f"{attrition_rate}%",
    }


def get_dashboard_data():
    row = _first_row("SELECT * FROM dashboard_kpis")
    gender_rows = run_query("SELECT * FROM gender_distribution ORDER BY gender")
    gender_distribution = [
        {
            "gender": item["GENDER"],
            "employee_count": _as_int(item["EMPLOYEE_COUNT"]),
        }
        for item in gender_rows
    ]
    return {
        "total_employees": _as_int(row.get("TOTAL_EMPLOYEES")),
        "department_count": _as_int(row.get("TOTAL_DEPARTMENTS")),
        "average_age": _as_float(row.get("AVG_AGE"), 2),
        "average_monthly_income": _as_float(row.get("AVG_INCOME"), 2),
        "attrition_rate": f"{_as_float(row.get('ATTRITION_RATE_PCT'), 2)}%",
        "gender_distribution": gender_distribution,
    }


def get_gender_distribution_data():
    rows = run_query("SELECT * FROM gender_distribution ORDER BY gender")
    return [
        {
            "gender": row["GENDER"],
            "employee_count": _as_int(row["EMPLOYEE_COUNT"]),
        }
        for row in rows
    ]


def get_job_role_distribution_data():
    rows = run_query("SELECT * FROM job_role_distribution ORDER BY jobrole")
    return [
        {
            "job_role": row["JOBROLE"],
            "employee_count": _as_int(row["EMPLOYEE_COUNT"]),
        }
        for row in rows
    ]


def get_salary_analytics_data():
    row = _first_row("SELECT * FROM salary_analytics")
    return {
        "average_salary": _as_float(row.get("AVERAGE_SALARY"), 2),
        "highest_salary": _as_int(row.get("HIGHEST_SALARY")),
        "lowest_salary": _as_int(row.get("LOWEST_SALARY")),
    }


def get_age_analytics_data():
    row = _first_row("SELECT * FROM age_analytics")
    return {
        "average_age": _as_float(row.get("AVERAGE_AGE"), 2),
        "youngest_employee": _as_int(row.get("YOUNGEST_EMPLOYEE")),
        "oldest_employee": _as_int(row.get("OLDEST_EMPLOYEE")),
    }


def get_employee_wellbeing_data():
    row = _first_row("SELECT * FROM employee_wellbeing")
    return {
        "average_environment_satisfaction": _as_float(
            row.get("AVERAGE_ENVIRONMENT_SATISFACTION"), 2
        ),
        "average_job_satisfaction": _as_float(
            row.get("AVERAGE_JOB_SATISFACTION"), 2
        ),
        "average_work_life_balance": _as_float(
            row.get("AVERAGE_WORK_LIFE_BALANCE"), 2
        ),
        "average_relationship_satisfaction": _as_float(
            row.get("AVERAGE_RELATIONSHIP_SATISFACTION"), 2
        ),
    }


def get_attrition_by_department_data():
    rows = run_query("SELECT * FROM attrition_by_department ORDER BY department")
    result = []
    for row in rows:
        attrition_yes = _as_int(row["ATTRITION_COUNT"])
        total_employees = _as_int(row["TOTAL_EMPLOYEES"])
        attrition_no = max(total_employees - attrition_yes, 0)
        result.append(
            {
                "department": row["DEPARTMENT"],
                "attrition": "No",
                "employee_count": attrition_no,
            }
        )
        result.append(
            {
                "department": row["DEPARTMENT"],
                "attrition": "Yes",
                "employee_count": attrition_yes,
            }
        )
    return result


def get_experience_summary_data():
    row = _first_row("SELECT * FROM experience_summary")
    return {
        "average_experience": _as_float(row.get("AVERAGE_EXPERIENCE"), 2),
        "maximum_experience": _as_int(row.get("MAXIMUM_EXPERIENCE")),
        "minimum_experience": _as_int(row.get("MINIMUM_EXPERIENCE")),
    }


def get_job_satisfaction_distribution_data():
    rows = run_query(
        "SELECT * FROM job_satisfaction_summary ORDER BY jobsatisfaction"
    )
    return [
        {
            "job_satisfaction": _as_int(row["JOBSATISFACTION"]),
            "employees": _as_int(row["EMPLOYEE_COUNT"]),
        }
        for row in rows
    ]


def get_work_life_balance_distribution_data():
    rows = run_query(
        "SELECT * FROM work_life_balance_summary ORDER BY worklifebalance"
    )
    return [
        {
            "work_life_balance": _as_int(row["WORKLIFEBALANCE"]),
            "employees": _as_int(row["EMPLOYEE_COUNT"]),
        }
        for row in rows
    ]


def get_salary_distribution_data():
    rows = run_query("SELECT * FROM department_summary ORDER BY department")
    return [
        {
            "department": row["DEPARTMENT"],
            "average_salary": _as_float(row["AVG_INCOME"], 2),
        }
        for row in rows
    ]


def get_age_distribution_data():
    rows = run_query("SELECT * FROM age_distribution")
    return [
        {
            "age_group": row["AGE_GROUP"],
            "employees": _as_int(row["EMPLOYEES"]),
        }
        for row in rows
    ]


def _format_dashboard_kpis_context() -> str:
    parts = []
    for row in run_query("SELECT * FROM dashboard_kpis"):
        parts.append(
            "OVERALL KPIs: "
            f"Total employees: {row['TOTAL_EMPLOYEES']}, "
            f"Departments: {row['TOTAL_DEPARTMENTS']}, "
            f"Avg age: {row['AVG_AGE']}, "
            f"Avg income: {row['AVG_INCOME']}, "
            f"Attrition rate: {row['ATTRITION_RATE_PCT']}%"
        )
    return "\n".join(parts) + ("\n\n" if parts else "")


def _format_attrition_summary_context() -> str:
    parts = []
    for row in run_query("SELECT * FROM attrition_summary"):
        parts.append(
            "ATTRITION SUMMARY: "
            f"Yes: {row['ATTRITION_YES']}, "
            f"No: {row['ATTRITION_NO']}, "
            f"Rate: {row['ATTRITION_RATE_PCT']}%"
        )
    return "\n".join(parts) + ("\n\n" if parts else "")


def _format_attrition_by_department_context() -> str:
    lines = ["ATTRITION BY DEPARTMENT:"]
    for row in run_query("SELECT * FROM attrition_by_department"):
        lines.append(
            f"{row['DEPARTMENT']}: {row['ATTRITION_COUNT']} "
            f"of {row['TOTAL_EMPLOYEES']} ({row['ATTRITION_RATE_PCT']}%)"
        )
    return "\n".join(lines) + "\n\n"


def _format_department_summary_context() -> str:
    lines = ["DEPARTMENT SUMMARY:"]
    for row in run_query("SELECT * FROM department_summary"):
        lines.append(
            f"{row['DEPARTMENT']}: {row['EMPLOYEE_COUNT']} employees, "
            f"avg income {row['AVG_INCOME']}, avg age {row['AVG_AGE']}"
        )
    return "\n".join(lines) + "\n\n"


def _format_gender_distribution_context() -> str:
    lines = ["GENDER DISTRIBUTION:"]
    for row in run_query("SELECT * FROM gender_distribution"):
        lines.append(f"{row['GENDER']}: {row['EMPLOYEE_COUNT']} employees")
    return "\n".join(lines) + "\n\n"


def _format_job_role_distribution_context() -> str:
    lines = ["JOB ROLE DISTRIBUTION:"]
    for row in run_query("SELECT * FROM job_role_distribution"):
        lines.append(f"{row['JOBROLE']}: {row['EMPLOYEE_COUNT']} employees")
    return "\n".join(lines) + "\n\n"


def _format_age_distribution_context() -> str:
    lines = ["AGE DISTRIBUTION:"]
    for row in run_query("SELECT * FROM age_distribution"):
        lines.append(f"{row['AGE_GROUP']}: {row['EMPLOYEES']} employees")
    return "\n".join(lines) + "\n\n"


def _format_salary_analytics_context() -> str:
    parts = []
    for row in run_query("SELECT * FROM salary_analytics"):
        parts.append(
            "SALARY ANALYTICS: "
            f"Average: {row['AVERAGE_SALARY']}, "
            f"Highest: {row['HIGHEST_SALARY']}, "
            f"Lowest: {row['LOWEST_SALARY']}"
        )
    return "\n".join(parts) + ("\n\n" if parts else "")


def _format_age_analytics_context() -> str:
    parts = []
    for row in run_query("SELECT * FROM age_analytics"):
        parts.append(
            "AGE ANALYTICS: "
            f"Average: {row['AVERAGE_AGE']}, "
            f"Youngest: {row['YOUNGEST_EMPLOYEE']}, "
            f"Oldest: {row['OLDEST_EMPLOYEE']}"
        )
    return "\n".join(parts) + ("\n\n" if parts else "")


def _format_experience_summary_context() -> str:
    parts = []
    for row in run_query("SELECT * FROM experience_summary"):
        parts.append(
            "EXPERIENCE SUMMARY (years at company): "
            f"Average: {row['AVERAGE_EXPERIENCE']}, "
            f"Max: {row['MAXIMUM_EXPERIENCE']}, "
            f"Min: {row['MINIMUM_EXPERIENCE']}"
        )
    return "\n".join(parts) + ("\n\n" if parts else "")


def _format_employee_wellbeing_context() -> str:
    parts = []
    for row in run_query("SELECT * FROM employee_wellbeing"):
        parts.append(
            "EMPLOYEE WELLBEING: "
            f"Avg environment satisfaction: {row['AVERAGE_ENVIRONMENT_SATISFACTION']}, "
            f"Avg job satisfaction: {row['AVERAGE_JOB_SATISFACTION']}, "
            f"Avg work-life balance: {row['AVERAGE_WORK_LIFE_BALANCE']}, "
            f"Avg relationship satisfaction: {row['AVERAGE_RELATIONSHIP_SATISFACTION']}"
        )
    return "\n".join(parts) + ("\n\n" if parts else "")


def _format_job_satisfaction_summary_context() -> str:
    lines = ["JOB SATISFACTION DISTRIBUTION (1=low, 4=high):"]
    for row in run_query("SELECT * FROM job_satisfaction_summary"):
        lines.append(
            f"Level {row['JOBSATISFACTION']}: {row['EMPLOYEE_COUNT']} employees, "
            f"avg income {row['AVG_INCOME']}"
        )
    return "\n".join(lines) + "\n\n"


def _format_work_life_balance_summary_context() -> str:
    lines = ["WORK-LIFE BALANCE DISTRIBUTION (1=low, 4=high):"]
    for row in run_query("SELECT * FROM work_life_balance_summary"):
        lines.append(f"Level {row['WORKLIFEBALANCE']}: {row['EMPLOYEE_COUNT']} employees")
    return "\n".join(lines) + "\n\n"


VIEW_CONTEXT_FORMATTERS = {
    "dashboard_kpis": _format_dashboard_kpis_context,
    "attrition_summary": _format_attrition_summary_context,
    "attrition_by_department": _format_attrition_by_department_context,
    "department_summary": _format_department_summary_context,
    "gender_distribution": _format_gender_distribution_context,
    "job_role_distribution": _format_job_role_distribution_context,
    "age_distribution": _format_age_distribution_context,
    "salary_analytics": _format_salary_analytics_context,
    "age_analytics": _format_age_analytics_context,
    "experience_summary": _format_experience_summary_context,
    "employee_wellbeing": _format_employee_wellbeing_context,
    "job_satisfaction_summary": _format_job_satisfaction_summary_context,
    "work_life_balance_summary": _format_work_life_balance_summary_context,
}


def get_workforce_context_for_views(view_names: list[str]) -> str:
    """
    Build context using only the requested analytics views.
    Unknown view names are ignored.
    """
    context_parts = []
    seen = set()

    for view_name in view_names:
        if view_name in seen:
            continue
        seen.add(view_name)
        formatter = VIEW_CONTEXT_FORMATTERS.get(view_name)
        if formatter is not None:
            context_parts.append(formatter())

    return "".join(context_parts).strip()


def get_workforce_context() -> str:
    """
    Pulls all 13 analytics views and formats them as plain text,
    ready to hand to an LLM as context. Covers every metric your
    FastAPI /utils.py functions expose, so the AI assistant can
    answer the same range of questions your REST API can.
    """
    return get_workforce_context_for_views(list(VIEW_CONTEXT_FORMATTERS.keys()))

import os
from fastapi import APIRouter, HTTPException, Query, status
from google import genai
from app.database import employees_collection
from app.models import Employee
from app.snowflake_client import (
    get_attrition_data,
    get_dashboard_data,
    get_gender_distribution_data,
    get_job_role_distribution_data,
    get_salary_analytics_data,
    get_age_analytics_data,
    get_employee_wellbeing_data,
    get_departments_data,
    get_attrition_by_department_data,
    get_experience_summary_data,
    get_job_satisfaction_distribution_data,
    get_work_life_balance_distribution_data,
    get_salary_distribution_data,
    get_age_distribution_data,
    run_query,
)

import math

router = APIRouter()


# ==========================================================
# BASIC API ENDPOINTS
# ==========================================================

@router.get(
    "/",
    tags=["Home"],
    summary="API Home",
    description="Returns a welcome message for the Workforce Analytics API."
)
def home():
    return {
        "message": "Welcome to the AI-Powered Workforce Analytics API"
    }


@router.get(
    "/test-db",
    tags=["Database"],
    summary="Test MongoDB Connection",
    description="Checks whether the MongoDB database is connected and returns the total number of employees."
)
def test_database():

    # Count the total number of employee records in MongoDB
    count = employees_collection.count_documents({})

    return {
        "status": "Connected Successfully",
        "total_employees": count
    }


@router.get(
    "/test-snowflake",
    tags=["Database"],
    summary="Test Snowflake Connection",
    description=(
        "Checks whether Snowflake is connected and returns current session "
        "context plus employee count from the Snowflake employees table."
    )
)
def test_snowflake():
    try:
        session_row = run_query(
            "SELECT CURRENT_ACCOUNT() AS account, CURRENT_WAREHOUSE() AS warehouse, "
            "CURRENT_DATABASE() AS database_name, CURRENT_SCHEMA() AS schema_name"
        )[0]
        employee_count_row = run_query(
            "SELECT COUNT(*) AS total_employees FROM employees"
        )[0]
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Snowflake connection failed: {str(exc)}"
        ) from exc

    return {
        "status": "Connected Successfully",
        "account": session_row["ACCOUNT"],
        "warehouse": session_row["WAREHOUSE"],
        "database": session_row["DATABASE_NAME"],
        "schema": session_row["SCHEMA_NAME"],
        "total_employees": employee_count_row["TOTAL_EMPLOYEES"],
    }


@router.get(
    "/test-ai-key",
    tags=["Database"],
    summary="Test Gemini API Key",
    description=(
        "Checks whether GEMINI_API_KEY is configured and accepted by Gemini "
        "for API access."
    )
)
def test_ai_key():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GEMINI_API_KEY is missing from environment variables."
        )

    try:
        client = genai.Client(api_key=api_key)
        client.models.generate_content(
            model="gemini-flash-latest",
            contents="Reply with exactly: OK"
        )
    except Exception as exc:
        error_message = str(exc)
        if "RESOURCE_EXHAUSTED" in error_message or "429" in error_message:
            return {
                "status": "API key is valid, but quota is exhausted.",
                "valid_api_key": True,
                "quota_available": False,
                "details": error_message,
            }
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gemini API key validation failed: {error_message}"
        ) from exc

    return {
        "status": "API key is valid and usable.",
        "valid_api_key": True,
        "quota_available": True,
    }


# ==========================================================
# EMPLOYEE ENDPOINTS
# ==========================================================

@router.get(
    "/employees",
    tags=["Employees"],
    summary="Get all employees",
    description="Returns a paginated list of employees with optional search and filters."
)
def get_employees(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Employees per page"),

    search: str | None = Query(
        None,
        description="Search by Employee ID, Department, Job Role, Gender or Attrition"
    ),

    department: str | None = Query(
        None,
        description="Filter by Department"
    ),

    jobRole: str | None = Query(
        None,
        description="Filter by Job Role"
    ),

    attrition: str | None = Query(
        None,
        description="Filter by Attrition"
    ),
):
    query: dict = {}

    # ----------------------------
    # Search
    # ----------------------------
    if search:
        search = search.strip()

    if search:
        query["$or"] = [
            {"EmpID": {"$regex": search, "$options": "i"}},
            {"Department": {"$regex": search, "$options": "i"}},
            {"JobRole": {"$regex": search, "$options": "i"}},
            {"Gender": {"$regex": search, "$options": "i"}},
            {"Attrition": {"$regex": search, "$options": "i"}},
        ]

    # ----------------------------
    # Filters
    # ----------------------------
    if department:
        query["Department"] = department.strip()

    if jobRole:
        query["JobRole"] = jobRole.strip()

    if attrition:
        query["Attrition"] = attrition.strip()

    skip = (page - 1) * limit

    total_employees = employees_collection.count_documents(query)

    total_pages = math.ceil(total_employees / limit) if total_employees else 1

    employees = list(
        employees_collection.find(
            query,
            {"_id": 0}
        )
        .skip(skip)
        .limit(limit)
    )

    return {
        "page": page,
        "limit": limit,
        "total_employees": total_employees,
        "total_pages": total_pages,
        "employees": employees,
    }

@router.get(
    "/employee/{emp_id}",
    tags=["Employees"],
    summary="Get employee by Employee ID",
    description="Returns details of a specific employee using the Employee ID."
)
def get_employee(emp_id: str):

    # Search for the employee by EmpID
    employee = employees_collection.find_one(
        {"EmpID": emp_id},
        {"_id": 0}
    )

    # Raise an exception if the employee does not exist
    if employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return employee


@router.post(
    "/employee",
    tags=["Employees"],
    summary="Create a new employee",
    description="Adds a new employee record to the workforce database.",
    status_code=status.HTTP_201_CREATED
)
def create_employee(employee: Employee):

    # Check whether the Employee ID already exists
    existing_employee = employees_collection.find_one(
        {"EmpID": employee.EmpID}
    )

    if existing_employee:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee ID already exists"
        )

    # Insert the new employee document
    employees_collection.insert_one(
        employee.model_dump()
    )

    return {
        "message": "Employee created successfully"
    }


@router.put(
    "/employee/{emp_id}",
    tags=["Employees"],
    summary="Update employee details",
    description="Updates the details of an existing employee.",
    status_code=status.HTTP_200_OK
)
def update_employee(
    emp_id: str,
    employee: Employee
):

    # Update the employee details
    result = employees_collection.update_one(
        {"EmpID": emp_id},
        {
            "$set": employee.model_dump()
        }
    )

    # Raise an exception if the employee is not found
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return {
        "message": "Employee updated successfully"
    }


@router.delete(
    "/employee/{emp_id}",
    tags=["Employees"],
    summary="Delete employee",
    description="Deletes an employee record from the workforce database.",
    status_code=status.HTTP_200_OK
)
def delete_employee(emp_id: str):

    # Delete the employee record
    result = employees_collection.delete_one(
        {"EmpID": emp_id}
    )

    # Raise an exception if the employee is not found
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return {
        "message": "Employee deleted successfully"
    }


# ==========================================================
# DEPARTMENT ENDPOINTS
# ==========================================================

@router.get(
    "/departments",
    tags=["Departments"],
    summary="Get all departments with employee count",
    description="Returns the list of departments along with the total number of employees in each department."
)
def get_departments_route():
    return get_departments_data()


# ==========================================================
# DASHBOARD ENDPOINTS
# ==========================================================

@router.get(
    "/attrition",
    tags=["Analytics"],
    summary="Get overall attrition statistics",
    description="Returns the overall employee attrition statistics."
)
def get_attrition():
    return get_attrition_data()


@router.get(
    "/dashboard",
    tags=["Dashboard"],
    summary="Get dashboard overview statistics",
    description="Returns key workforce metrics displayed on the dashboard."
)
def get_dashboard():
    return get_dashboard_data()


# ==========================================================
# ANALYTICS ENDPOINTS
# ==========================================================

@router.get(
    "/gender-distribution",
    tags=["Analytics"],
    summary="Get gender distribution of employees",
    description="Returns the number of employees grouped by gender."
)
def gender_distribution():
    return get_gender_distribution_data()


@router.get(
    "/job-role-distribution",
    tags=["Analytics"],
    summary="Get employee distribution by job role",
    description="Returns the number of employees for each job role."
)
def job_role_distribution():
    return get_job_role_distribution_data()


@router.get(
    "/salary-analytics",
    tags=["Analytics"],
    summary="Get salary analytics",
    description="Returns salary statistics including average, minimum and maximum salary."
)
def salary_analytics():
    return get_salary_analytics_data()


@router.get(
    "/age-analytics",
    tags=["Analytics"],
    summary="Get age analytics",
    description="Returns workforce age statistics including average, minimum and maximum age."
)
def age_analytics():
    return get_age_analytics_data()

@router.get(
    "/employee-wellbeing",
    tags=["Analytics"],
    summary="Get employee wellbeing analytics",
    description="Returns employee wellbeing metrics based on satisfaction and work-life balance."
)
def employee_wellbeing():
    return get_employee_wellbeing_data()


@router.get(
    "/attrition-by-department",
    tags=["Analytics"],
    summary="Get attrition statistics by department",
    description="Returns employee attrition statistics grouped by department."
)
def attrition_by_department():
    return get_attrition_by_department_data()


@router.get(
    "/experience-summary",
    tags=["Analytics"],
    summary="Get employee experience summary",
    description="Returns the average, minimum and maximum years employees have worked in the organization."
)
def experience_summary():
    return get_experience_summary_data()


@router.get(
    "/job-satisfaction",
    tags=["Analytics"],
    summary="Get job satisfaction distribution",
    description="Returns the distribution of employees based on their job satisfaction levels."
)
def job_satisfaction():
    return get_job_satisfaction_distribution_data()


@router.get(
    "/work-life-balance",
    tags=["Analytics"],
    summary="Get work-life balance distribution",
    description="Returns the distribution of employees based on work-life balance ratings."
)
def work_life_balance():
    return get_work_life_balance_distribution_data()


@router.get(
    "/salary-distribution",
    tags=["Analytics"],
    summary="Get average salary by department",
    description="Returns the average monthly salary for each department."
)
def salary_distribution():
    return get_salary_distribution_data()


@router.get(
    "/age-distribution",
    tags=["Analytics"],
    summary="Get employee age distribution",
    description="Returns employees grouped into predefined age categories."
)
def age_distribution():

    return get_age_distribution_data()
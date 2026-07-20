from fastapi import APIRouter, HTTPException, Query, status
from app.database import employees_collection
from app.models import Employee
from app.utils import (
    calculate_attrition,
    calculate_dashboard_statistics,
    get_gender_distribution,
    get_job_role_distribution,
    get_salary_analytics,
    get_age_analytics,
    get_employee_wellbeing,
    get_departments,
    get_attrition_by_department,
    get_experience_summary,
    get_job_satisfaction_distribution,
    get_work_life_balance_distribution,
    get_salary_distribution,
    get_age_distribution
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


# ==========================================================
# EMPLOYEE ENDPOINTS
# ==========================================================

@router.get(
    "/employees",
    tags=["Employees"],
    summary="Get all employees",
    description="Returns a paginated list of employees."
)
def get_employees(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Number of employees per page")
):

    # Calculate how many records should be skipped
    skip = (page - 1) * limit

    # Count the total number of employees
    total_employees = employees_collection.count_documents({})

    # Calculate total number of pages
    total_pages = math.ceil(total_employees / limit)

    # Fetch employees excluding MongoDB's internal _id field
    employees = list(
        employees_collection.find({}, {"_id": 0})
        .skip(skip)
        .limit(limit)
    )

    return {
        "page": page,
        "limit": limit,
        "total_employees": total_employees,
        "total_pages": total_pages,
        "employees": employees
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
    return get_departments()


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
    return calculate_attrition()


@router.get(
    "/dashboard",
    tags=["Dashboard"],
    summary="Get dashboard overview statistics",
    description="Returns key workforce metrics displayed on the dashboard."
)
def get_dashboard():
    return calculate_dashboard_statistics()


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
    return get_gender_distribution()


@router.get(
    "/job-role-distribution",
    tags=["Analytics"],
    summary="Get employee distribution by job role",
    description="Returns the number of employees for each job role."
)
def job_role_distribution():
    return get_job_role_distribution()


@router.get(
    "/salary-analytics",
    tags=["Analytics"],
    summary="Get salary analytics",
    description="Returns salary statistics including average, minimum and maximum salary."
)
def salary_analytics():
    return get_salary_analytics()


@router.get(
    "/age-analytics",
    tags=["Analytics"],
    summary="Get age analytics",
    description="Returns workforce age statistics including average, minimum and maximum age."
)
def age_analytics():
    return get_age_analytics()


@router.get(
    "/employee-wellbeing",
    tags=["Analytics"],
    summary="Get employee wellbeing analytics",
    description="Returns employee wellbeing metrics based on satisfaction and work-life balance."
)
def employee_wellbeing():
    return get_employee_wellbeing()


@router.get(
    "/attrition-by-department",
    tags=["Analytics"],
    summary="Get attrition statistics by department",
    description="Returns employee attrition statistics grouped by department."
)
def attrition_by_department():
    return get_attrition_by_department()


@router.get(
    "/experience-summary",
    tags=["Analytics"],
    summary="Get employee experience summary",
    description="Returns the average, minimum and maximum years employees have worked in the organization."
)
def experience_summary():
    return get_experience_summary()


@router.get(
    "/job-satisfaction",
    tags=["Analytics"],
    summary="Get job satisfaction distribution",
    description="Returns the distribution of employees based on their job satisfaction levels."
)
def job_satisfaction():
    return get_job_satisfaction_distribution()


@router.get(
    "/work-life-balance",
    tags=["Analytics"],
    summary="Get work-life balance distribution",
    description="Returns the distribution of employees based on work-life balance ratings."
)
def work_life_balance():
    return get_work_life_balance_distribution()


@router.get(
    "/salary-distribution",
    tags=["Analytics"],
    summary="Get average salary by department",
    description="Returns the average monthly salary for each department."
)
def salary_distribution():
    return get_salary_distribution()


@router.get(
    "/age-distribution",
    tags=["Analytics"],
    summary="Get employee age distribution",
    description="Returns employees grouped into predefined age categories."
)
def age_distribution():
    return get_age_distribution()
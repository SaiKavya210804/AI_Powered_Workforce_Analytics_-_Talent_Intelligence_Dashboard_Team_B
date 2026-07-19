from fastapi import APIRouter, HTTPException, Query
from app.database import employees_collection
from app.utils import calculate_attrition
import math

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to the AI-Powered Workforce Analytics API"
    }


@router.get("/test-db")
def test_database():
    count = employees_collection.count_documents({})

    return {
        "status": "Connected Successfully",
        "total_employees": count
    }


@router.get(
    "/employees",
    tags=["Employees"],
    summary="Get all employees"
)
def get_employees(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    skip = (page - 1) * limit

    total_employees = employees_collection.count_documents({})
    total_pages = math.ceil(total_employees / limit)

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
    summary="Get employee by Employee ID"
)
def get_employee(emp_id: str):

    employee = employees_collection.find_one(
        {"EmpID": emp_id},
        {"_id": 0}
    )

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@router.get(
    "/departments",
    tags=["Departments"],
    summary="Get all departments with employee count"
)
def get_departments():

    pipeline = [
        {
            "$group": {
                "_id": "$Department",
                "employee_count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        }
    ]

    departments = list(employees_collection.aggregate(pipeline))

    result = []

    for department in departments:
        result.append({
            "department": department["_id"],
            "employee_count": department["employee_count"]
        })

    return result


@router.get(
    "/attrition",
    tags=["Analytics"],
    summary="Get overall attrition statistics"
)
def get_attrition():
    return calculate_attrition()


@router.get(
    "/dashboard",
    tags=["Dashboard"],
    summary="Get dashboard overview statistics"
)
def get_dashboard():

    total_employees = employees_collection.count_documents({})
    attrition_yes = employees_collection.count_documents({"Attrition": "Yes"})

    attrition_rate = (
        round((attrition_yes / total_employees) * 100, 2)
        if total_employees > 0
        else 0
    )

    pipeline = [
        {
            "$group": {
                "_id": None,
                "average_age": {"$avg": "$Age"},
                "average_income": {"$avg": "$MonthlyIncome"}
            }
        }
    ]

    analytics = list(employees_collection.aggregate(pipeline))[0]

    department_count = len(
        employees_collection.distinct("Department")
    )

    gender_pipeline = [
        {
            "$group": {
                "_id": "$Gender",
                "count": {"$sum": 1}
            }
        }
    ]

    gender_distribution = list(
        employees_collection.aggregate(gender_pipeline)
    )

    return {
        "total_employees": total_employees,
        "department_count": department_count,
        "average_age": round(analytics["average_age"], 2),
        "average_monthly_income": round(analytics["average_income"], 2),
        "attrition_rate": f"{attrition_rate}%",
        "gender_distribution": gender_distribution
    }
"""
Utility functions for workforce analytics.

This module contains all business logic and MongoDB aggregation
pipelines used by the Workforce Analytics API.
"""

from app.database import employees_collection


# ==========================================================
# DASHBOARD ANALYTICS
# ==========================================================

def calculate_attrition():
    """
    Calculate overall attrition statistics.
    """

    # Count the total number of employees
    total_employees = employees_collection.count_documents({})

    # Count employees who have left the organization
    attrition_yes = employees_collection.count_documents(
        {"Attrition": "Yes"}
    )

    # Count employees currently working in the organization
    attrition_no = employees_collection.count_documents(
        {"Attrition": "No"}
    )

    # Calculate the overall attrition percentage
    attrition_rate = (
        round((attrition_yes / total_employees) * 100, 2)
        if total_employees > 0
        else 0
    )

    return {
        "total_employees": total_employees,
        "employees_with_attrition": attrition_yes,
        "employees_without_attrition": attrition_no,
        "attrition_rate": f"{attrition_rate}%"
    }


def calculate_dashboard_statistics():
    """
    Calculate overall dashboard statistics.
    """

    # Count the total number of employees
    total_employees = employees_collection.count_documents({})

    # Count employees who have left the organization
    attrition_yes = employees_collection.count_documents(
        {"Attrition": "Yes"}
    )

    # Calculate the attrition percentage
    attrition_rate = (
        round((attrition_yes / total_employees) * 100, 2)
        if total_employees > 0
        else 0
    )

    # Calculate average employee age and monthly income
    pipeline = [
        {
            "$group": {
                "_id": None,
                "average_age": {"$avg": "$Age"},
                "average_income": {"$avg": "$MonthlyIncome"}
            }
        }
    ]

    # Execute the aggregation pipeline
    analytics = list(
        employees_collection.aggregate(pipeline)
    )[0]

    # Count the total number of unique departments
    department_count = len(
        employees_collection.distinct("Department")
    )

    # Calculate employee distribution by gender
    gender_pipeline = [
        {
            "$group": {
                "_id": "$Gender",
                "employee_count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        }
    ]

    # Execute the gender distribution pipeline
    gender_data = list(
        employees_collection.aggregate(gender_pipeline)
    )

    # Format the response for consistency with other APIs
    gender_distribution = []

    for gender in gender_data:
        gender_distribution.append({
            "gender": gender["_id"],
            "employee_count": gender["employee_count"]
        })

    return {
        "total_employees": total_employees,
        "department_count": department_count,
        "average_age": round(analytics["average_age"], 2),
        "average_monthly_income": round(
            analytics["average_income"], 2
        ),
        "attrition_rate": f"{attrition_rate}%",
        "gender_distribution": gender_distribution
    }

# ==========================================================
# DISTRIBUTION ANALYTICS
# ==========================================================

def get_gender_distribution():
    """
    Get employee gender distribution.
    """

    # Aggregate employee count by gender
    pipeline = [
        {
            "$group": {
                "_id": "$Gender",
                "employee_count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        }
    ]

    # Execute the aggregation pipeline
    genders = list(
        employees_collection.aggregate(pipeline)
    )

    # Format the response
    result = []

    for gender in genders:
        result.append({
            "gender": gender["_id"],
            "employee_count": gender["employee_count"]
        })

    return result


def get_job_role_distribution():
    """
    Get employee distribution by job role.
    """

    # Aggregate employee count by job role
    pipeline = [
        {
            "$group": {
                "_id": "$JobRole",
                "employee_count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        }
    ]

    # Execute the aggregation pipeline
    job_roles = list(
        employees_collection.aggregate(pipeline)
    )

    # Format the response
    result = []

    for role in job_roles:
        result.append({
            "job_role": role["_id"],
            "employee_count": role["employee_count"]
        })

    return result

# ==========================================================
# SALARY & AGE ANALYTICS
# ==========================================================

def get_salary_analytics():
    """
    Get salary analytics.
    """

    # Calculate average, highest and lowest monthly salary
    pipeline = [
        {
            "$group": {
                "_id": None,
                "average_salary": {"$avg": "$MonthlyIncome"},
                "highest_salary": {"$max": "$MonthlyIncome"},
                "lowest_salary": {"$min": "$MonthlyIncome"}
            }
        }
    ]

    # Execute the aggregation pipeline
    analytics = list(
        employees_collection.aggregate(pipeline)
    )[0]

    return {
        "average_salary": round(analytics["average_salary"], 2),
        "highest_salary": analytics["highest_salary"],
        "lowest_salary": analytics["lowest_salary"]
    }


def get_age_analytics():
    """
    Get age analytics.
    """

    # Calculate average, minimum and maximum employee age
    pipeline = [
        {
            "$group": {
                "_id": None,
                "average_age": {"$avg": "$Age"},
                "youngest_employee": {"$min": "$Age"},
                "oldest_employee": {"$max": "$Age"}
            }
        }
    ]

    # Execute the aggregation pipeline
    analytics = list(
        employees_collection.aggregate(pipeline)
    )[0]

    return {
        "average_age": round(analytics["average_age"], 2),
        "youngest_employee": analytics["youngest_employee"],
        "oldest_employee": analytics["oldest_employee"]
    }

# ==========================================================
# EMPLOYEE WELLBEING ANALYTICS
# ==========================================================

def get_employee_wellbeing():
    """
    Get employee wellbeing metrics.
    """

    # Calculate average employee satisfaction and wellbeing metrics
    pipeline = [
        {
            "$group": {
                "_id": None,
                "average_environment_satisfaction": {
                    "$avg": "$EnvironmentSatisfaction"
                },
                "average_job_satisfaction": {
                    "$avg": "$JobSatisfaction"
                },
                "average_work_life_balance": {
                    "$avg": "$WorkLifeBalance"
                },
                "average_relationship_satisfaction": {
                    "$avg": "$RelationshipSatisfaction"
                }
            }
        }
    ]

    # Execute the aggregation pipeline
    analytics = list(
        employees_collection.aggregate(pipeline)
    )[0]

    return {
        "average_environment_satisfaction": round(
            analytics["average_environment_satisfaction"], 2
        ),
        "average_job_satisfaction": round(
            analytics["average_job_satisfaction"], 2
        ),
        "average_work_life_balance": round(
            analytics["average_work_life_balance"], 2
        ),
        "average_relationship_satisfaction": round(
            analytics["average_relationship_satisfaction"], 2
        )
    }

# ==========================================================
# DEPARTMENT ANALYTICS
# ==========================================================

def get_departments():
    """
    Get all departments with employee count.
    """

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

    # Execute the aggregation pipeline
    departments = list(
        employees_collection.aggregate(pipeline)
    )

    result = []

    for department in departments:
        result.append({
            "department": department["_id"],
            "employee_count": department["employee_count"]
        })

    return result


def get_attrition_by_department():
    """
    Get attrition statistics by department.
    """

    # Aggregate employee attrition count for each department
    pipeline = [
        {
            "$group": {
                "_id": {
                    "department": "$Department",
                    "attrition": "$Attrition"
                },
                "employee_count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "_id.department": 1,
                "_id.attrition": 1
            }
        }
    ]

    # Execute the aggregation pipeline
    analytics = list(
        employees_collection.aggregate(pipeline)
    )

    # Format the response
    result = []

    for item in analytics:
        result.append({
            "department": item["_id"]["department"],
            "attrition": item["_id"]["attrition"],
            "employee_count": item["employee_count"]
        })

    return result


def get_experience_summary():
    """
    Get employee experience summary.
    """

    # Calculate average, maximum and minimum years at the company
    pipeline = [
        {
            "$group": {
                "_id": None,
                "average_experience": {"$avg": "$YearsAtCompany"},
                "maximum_experience": {"$max": "$YearsAtCompany"},
                "minimum_experience": {"$min": "$YearsAtCompany"}
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(
        employees_collection.aggregate(pipeline)
    )

    if result:
        data = result[0]

        return {
            "average_experience": round(data["average_experience"], 2),
            "maximum_experience": data["maximum_experience"],
            "minimum_experience": data["minimum_experience"]
        }

    return {
        "average_experience": 0,
        "maximum_experience": 0,
        "minimum_experience": 0
    }


def get_job_satisfaction_distribution():
    """
    Get employee distribution by job satisfaction.
    """

    # Aggregate employee count by job satisfaction level
    pipeline = [
        {
            "$group": {
                "_id": "$JobSatisfaction",
                "employees": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(
        employees_collection.aggregate(pipeline)
    )

    return [
        {
            "job_satisfaction": item["_id"],
            "employees": item["employees"]
        }
        for item in result
    ]


def get_work_life_balance_distribution():
    """
    Get employee distribution by work-life balance.
    """

    # Aggregate employee count by work-life balance rating
    pipeline = [
        {
            "$group": {
                "_id": "$WorkLifeBalance",
                "employees": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(
        employees_collection.aggregate(pipeline)
    )

    return [
        {
            "work_life_balance": item["_id"],
            "employees": item["employees"]
        }
        for item in result
    ]


def get_salary_distribution():
    """
    Get average salary by department.
    """

    # Calculate average monthly salary for each department
    pipeline = [
        {
            "$group": {
                "_id": "$Department",
                "average_salary": {"$avg": "$MonthlyIncome"}
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(
        employees_collection.aggregate(pipeline)
    )

    return [
        {
            "department": item["_id"],
            "average_salary": round(item["average_salary"], 2)
        }
        for item in result
    ]


def get_age_distribution():
    """
    Get employee age distribution.
    """

    # Group employees into predefined age ranges
    pipeline = [
        {
            "$bucket": {
                "groupBy": "$Age",
                "boundaries": [18, 25, 35, 45, 55, 100],
                "default": "Other",
                "output": {
                    "employees": {"$sum": 1}
                }
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(
        employees_collection.aggregate(pipeline)
    )

    # Convert MongoDB bucket boundaries into readable labels
    age_labels = {
        18: "18-24",
        25: "25-34",
        35: "35-44",
        45: "45-54",
        55: "55+"
    }

    return [
        {
            "age_group": age_labels.get(item["_id"], "Other"),
            "employees": item["employees"]
        }
        for item in result
    ]
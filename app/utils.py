from app.database import employees_collection


def calculate_attrition():
    """
    Calculate overall attrition statistics.
    """

    total_employees = employees_collection.count_documents({})

    attrition_yes = employees_collection.count_documents(
        {"Attrition": "Yes"}
    )

    attrition_no = employees_collection.count_documents(
        {"Attrition": "No"}
    )

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

    total_employees = employees_collection.count_documents({})
    attrition_yes = employees_collection.count_documents(
        {"Attrition": "Yes"}
    )

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

    analytics = list(
        employees_collection.aggregate(pipeline)
    )[0]

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
        "average_monthly_income": round(
            analytics["average_income"], 2
        ),
        "attrition_rate": f"{attrition_rate}%",
        "gender_distribution": gender_distribution
    }
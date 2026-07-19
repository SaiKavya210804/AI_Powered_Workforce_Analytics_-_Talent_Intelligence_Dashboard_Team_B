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
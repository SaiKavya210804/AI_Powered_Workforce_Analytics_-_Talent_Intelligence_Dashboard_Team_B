import logging
from datetime import datetime

from app.database import db

logger = logging.getLogger("automation")


def refresh_analytics_cache():
    """
    Recalculates KPIs from the MongoDB employee collection and updates the
    'analytics_cache' so reports.py and FastAPI endpoints always have fresh metrics.
    """

    logger.info("🔄 [Analytics Automation] Recalculating workforce KPIs...")

    try:
        # 1. Fetch all employee records from MongoDB
        employees = list(
            db.employees.find({}, {"_id": 0})
        )

        if not employees:
            logger.warning(
                "⚠️ [Analytics Automation] No employee records found in database."
            )
            return False

        total_employees = len(employees)

        # 2. Calculate Attrition Rate
        attrition_count = sum(
            1
            for emp in employees
            if str(
                emp.get("attrition")
                or emp.get("Attrition")
                or ""
            ).lower() in ["yes", "true", "1"]
        )

        attrition_rate = (
            round((attrition_count / total_employees) * 100, 2)
            if total_employees > 0
            else 0.0
        )

        # 3. Calculate Average Salary
        total_salary = sum(
            float(
                emp.get("salary")
                or emp.get("Salary")
                or emp.get("MonthlyIncome")
                or 0
            )
            for emp in employees
        )

        avg_salary = (
            round(total_salary / total_employees, 2)
            if total_employees > 0
            else 0.0
        )

        # 4. Calculate Department Breakdown
        dept_counts = {}

        for emp in employees:
            department = (
                emp.get("department")
                or emp.get("Department")
                or "Unassigned"
            )

            dept_counts[department] = (
                dept_counts.get(department, 0) + 1
            )

        department_distribution = sorted(
            (
                {
                    "department": department,
                    "count": count,
                }
                for department, count in dept_counts.items()
            ),
            key=lambda item: item["department"],
        )

        # ---------------------------------------------------------
        # 4A. Calculate Department-wise Attrition
        # ---------------------------------------------------------

        department_attrition = {}

        for department in dept_counts:

            dept_employees = [
                emp
                for emp in employees
                if (
                    emp.get("Department")
                    or emp.get("department")
                ) == department
            ]

            dept_total = len(dept_employees)

            dept_attrition = sum(
                1
                for emp in dept_employees
                if str(
                    emp.get("Attrition")
                    or emp.get("attrition")
                    or ""
                ).lower() in ["yes", "true", "1"]
            )

            department_attrition[department] = (
                round(
                    (dept_attrition / dept_total) * 100,
                    2,
                )
                if dept_total
                else 0.0
            )

        # ---------------------------------------------------------
        # 4B. Calculate Average Job Satisfaction
        # ---------------------------------------------------------

        job_satisfaction_values = [
            float(
                emp.get("JobSatisfaction")
                or emp.get("job_satisfaction")
                or 0
            )
            for emp in employees
            if (
                emp.get("JobSatisfaction") is not None
                or emp.get("job_satisfaction") is not None
            )
        ]

        avg_job_satisfaction = (
            round(
                sum(job_satisfaction_values)
                / len(job_satisfaction_values),
                2,
            )
            if job_satisfaction_values
            else None
        )

        # ---------------------------------------------------------
        # 4C. Calculate Average Work-Life Balance
        # ---------------------------------------------------------

        work_life_values = [
            float(
                emp.get("WorkLifeBalance")
                or emp.get("work_life_balance")
                or 0
            )
            for emp in employees
            if (
                emp.get("WorkLifeBalance") is not None
                or emp.get("work_life_balance") is not None
            )
        ]

        avg_work_life_balance = (
            round(
                sum(work_life_values)
                / len(work_life_values),
                2,
            )
            if work_life_values
            else None
        )

        # ---------------------------------------------------------
        # 5. Save summary into MongoDB analytics cache
        # ---------------------------------------------------------

        summary_doc = {
            "_id": "latest_summary",
            "total_employees": total_employees,
            "attrition_count": attrition_count,
            "attrition_rate": attrition_rate,
            "avg_salary": avg_salary,
            "department_distribution": department_distribution,
            "department_attrition": department_attrition,
            "job_satisfaction": avg_job_satisfaction,
            "work_life_balance": avg_work_life_balance,
            "updated_at": datetime.now().isoformat(),
        }

        db.analytics_cache.replace_one(
            {"_id": "latest_summary"},
            summary_doc,
            upsert=True,
        )

        logger.info(
            "✅ [Analytics Automation] Analytics cache refreshed successfully!"
        )

        return True

    except Exception as exc:
        logger.error(
            f"❌ [Analytics Automation] Failed to refresh analytics: {exc}"
        )
        return False
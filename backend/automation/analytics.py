import logging
from datetime import datetime
from app.database import db

logger = logging.getLogger("automation")

def refresh_analytics_cache():
    """
    Recalculates KPIs from the MongoDB employee collection and updates the 'analytics_cache'
    so reports.py and FastAPI endpoints always have fresh metrics.
    """
    logger.info("🔄 [Analytics Automation] Recalculating workforce KPIs...")
    try:
        # 1. Fetch all employee records from MongoDB
        employees = list(db.employees.find())
        
        if not employees:
            logger.warning("⚠️ [Analytics Automation] No employee records found in database.")
            return False

        total_employees = len(employees)
        
        # 2. Calculate Attrition Rate (supports 'attrition' or 'Attrition')
        attrition_count = sum(
            1 for emp in employees 
            if str(emp.get("attrition") or emp.get("Attrition") or "").lower() in ["yes", "true", "1"]
        )
        attrition_rate = round((attrition_count / total_employees) * 100, 2) if total_employees > 0 else 0.0

        # 3. Calculate Average Salary (supports 'salary', 'Salary', or 'MonthlyIncome')
        total_salary = sum(
            float(emp.get("salary") or emp.get("Salary") or emp.get("MonthlyIncome") or 0) 
            for emp in employees
        )
        avg_salary = round(total_salary / total_employees, 2) if total_employees > 0 else 0.0

        # 4. Calculate Department Breakdown (supports 'department' or 'Department')
        dept_counts = {}
        for emp in employees:
            dept = emp.get("department") or emp.get("Department") or "Unassigned"
            dept_counts[dept] = dept_counts.get(dept, 0) + 1
            
        department_distribution = [
            {"department": dept, "count": count} for dept, count in dept_counts.items()
        ]

        # 5. Save/Update in MongoDB 'analytics_cache' collection
        summary_doc = {
            "_id": "latest_summary",
            "total_employees": total_employees,
            "attrition_count": attrition_count,
            "attrition_rate": attrition_rate,
            "avg_salary": avg_salary,
            "department_distribution": department_distribution,
            "updated_at": datetime.now().isoformat()
        }

        db.analytics_cache.replace_one(
            {"_id": "latest_summary"}, 
            summary_doc, 
            upsert=True
        )
        
        logger.info("✅ [Analytics Automation] Analytics cache refreshed successfully!")
        return True

    except Exception as e:
        logger.error(f"❌ [Analytics Automation] Failed to refresh analytics: {str(e)}")
        return False
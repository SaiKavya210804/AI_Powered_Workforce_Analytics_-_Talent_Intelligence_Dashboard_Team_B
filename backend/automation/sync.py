import logging
import os

from app.database import db
from app.snowflake_client import get_snowflake_connection

logger = logging.getLogger("automation")


def sync_mongodb_to_snowflake():
    """Synchronize MongoDB employee records into a Snowflake staging table."""
    logger.info("🔄 [Sync] Starting MongoDB -> Snowflake synchronization...")

    try:
        employees = list(db.employees.find({}, {"_id": 0}))
        if not employees:
            logger.warning("⚠️ [Sync] No employee records found in MongoDB.")
            return False

        conn = get_snowflake_connection()
        cur = conn.cursor()

        cur.execute(
            """
            CREATE OR REPLACE TABLE WORKFORCE_SYNC_EMPLOYEES (
                EMPID STRING,
                AGE NUMBER,
                GENDER STRING,
                DEPARTMENT STRING,
                JOBROLE STRING,
                MONTHLYINCOME NUMBER,
                ATTRITION STRING,
                UPDATED_AT STRING
            )
            """
        )

        for employee in employees:
            cur.execute(
                """
                INSERT INTO WORKFORCE_SYNC_EMPLOYEES (
                    EMPID, AGE, GENDER, DEPARTMENT, JOBROLE,
                    MONTHLYINCOME, ATTRITION, UPDATED_AT
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    employee.get("EmpID") or employee.get("emp_id") or employee.get("EmpId"),
                    employee.get("Age") or employee.get("age"),
                    employee.get("Gender") or employee.get("gender"),
                    employee.get("Department") or employee.get("department"),
                    employee.get("JobRole") or employee.get("jobrole") or employee.get("JobRole"),
                    employee.get("MonthlyIncome") or employee.get("monthlyincome") or employee.get("salary"),
                    employee.get("Attrition") or employee.get("attrition"),
                    employee.get("updated_at") or employee.get("UpdatedAt") or "",
                ),
            )

        conn.commit()
        cur.close()
        conn.close()

        logger.info("✅ [Sync] MongoDB data synchronized to Snowflake successfully.")
        return True

    except Exception as exc:
        logger.error(f"❌ [Sync] Synchronization failed: {exc}")
        return False

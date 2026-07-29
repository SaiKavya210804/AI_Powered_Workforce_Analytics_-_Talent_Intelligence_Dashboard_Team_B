import os
import json
import csv
import logging
from datetime import datetime
from app.database import db

logger = logging.getLogger("automation")

REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "exports")

def generate_automated_reports():
    """
    Generates updated workforce summary report files (JSON & CSV) upon data refresh.
    """
    logger.info("📄 [Report Automation] Generating automated workforce report...")
    
    try:
        os.makedirs(REPORTS_DIR, exist_ok=True)
        
        # 1. Fetch the latest analytics summary calculated by analytics.py
        summary = db.analytics_cache.find_one({"_id": "latest_summary"})
        if not summary:
            logger.warning("⚠️ [Report Automation] No summary data found to generate report.")
            return False
            
        report_data = {
            "title": "Automated Workforce Analytics Report",
            "generated_at": datetime.now().isoformat(),
            "metrics": {
                "total_employees": summary.get("total_employees", 0),
                "attrition_rate": f"{summary.get('attrition_rate', 0)}%",
                "average_salary": summary.get("avg_salary", 0),
                "department_breakdown": summary.get("department_distribution", [])
            }
        }
        
        # 2. Save JSON Report
        json_filepath = os.path.join(REPORTS_DIR, "latest_workforce_report.json")
        with open(json_filepath, "w") as f:
            json.dump(report_data, f, indent=4)
            
        # 3. Save CSV Report
        csv_filepath = os.path.join(REPORTS_DIR, "latest_workforce_report.csv")
        with open(csv_filepath, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["Metric Name", "Value"])
            writer.writerow(["Total Employees", summary.get("total_employees", 0)])
            writer.writerow(["Attrition Rate", f"{summary.get('attrition_rate', 0)}%"])
            writer.writerow(["Average Salary", summary.get("avg_salary", 0)])
            writer.writerow([])
            writer.writerow(["Department", "Employee Count"])
            for dept in summary.get("department_distribution", []):
                writer.writerow([dept.get("department", "Unassigned"), dept.get("count", 0)])
            
        logger.info(f"✅ [Report Automation] Reports saved successfully to {REPORTS_DIR}")
        return True

    except Exception as e:
        logger.error(f"❌ [Report Automation] Failed to generate reports: {str(e)}")
        return False
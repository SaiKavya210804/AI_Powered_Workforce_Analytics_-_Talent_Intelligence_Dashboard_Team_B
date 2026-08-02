import csv
import json
import logging
import os
from datetime import datetime

from app.database import db

logger = logging.getLogger("automation")

REPORTS_DIR = os.path.join(
    os.path.dirname(__file__),
    "..",
    "exports",
)


def generate_automated_reports():
    """
    Generates updated workforce summary report files (JSON & CSV)
    from the latest analytics cache.
    """

    logger.info(
        "📄 [Report Automation] Generating automated workforce report..."
    )

    try:

        os.makedirs(REPORTS_DIR, exist_ok=True)

        # Fetch latest analytics summary
        summary = db.analytics_cache.find_one(
            {"_id": "latest_summary"},
            {"_id": 0},
        )

        if not summary:
            logger.warning(
                "⚠️ [Report Automation] No summary data found."
            )
            return False

        report_data = {
            "title": "Automated Workforce Analytics Report",
            "generated_at": datetime.now().isoformat(),
            "metrics": {
                "total_employees": summary.get(
                    "total_employees",
                    0,
                ),
                "attrition_rate": (
                    f"{summary.get('attrition_rate', 0)}%"
                ),
                "average_salary": summary.get(
                    "avg_salary",
                    0,
                ),
                "department_breakdown": summary.get(
                    "department_distribution",
                    [],
                ),
            },
        }

        # JSON report
        json_filepath = os.path.join(
            REPORTS_DIR,
            "latest_workforce_report.json",
        )

        with open(
            json_filepath,
            "w",
            encoding="utf-8",
        ) as f:

            json.dump(
                report_data,
                f,
                indent=4,
                ensure_ascii=False,
            )

        # CSV report
        csv_filepath = os.path.join(
            REPORTS_DIR,
            "latest_workforce_report.csv",
        )

        with open(
            csv_filepath,
            "w",
            newline="",
            encoding="utf-8",
        ) as f:

            writer = csv.writer(f)

            writer.writerow(
                ["Metric Name", "Value"]
            )

            writer.writerow(
                [
                    "Total Employees",
                    summary.get(
                        "total_employees",
                        0,
                    ),
                ]
            )

            writer.writerow(
                [
                    "Attrition Rate",
                    f"{summary.get('attrition_rate', 0)}%",
                ]
            )

            writer.writerow(
                [
                    "Average Salary",
                    summary.get(
                        "avg_salary",
                        0,
                    ),
                ]
            )

            writer.writerow([])

            writer.writerow(
                [
                    "Department",
                    "Employee Count",
                ]
            )

            for department in summary.get(
                "department_distribution",
                [],
            ):
                writer.writerow(
                    [
                        department.get(
                            "department",
                            "Unassigned",
                        ),
                        department.get(
                            "count",
                            0,
                        ),
                    ]
                )

        logger.info(
            "✅ [Report Automation] Reports generated successfully."
        )

        return True

    except Exception:
        logger.exception(
            "❌ [Report Automation] Failed to generate reports."
        )
        return False
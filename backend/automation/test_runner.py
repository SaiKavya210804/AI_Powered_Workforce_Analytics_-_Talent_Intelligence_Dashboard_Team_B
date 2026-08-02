import logging
import os
import sys

ROOT_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from automation.sync import sync_all
from automation.analytics import refresh_analytics_cache
from automation.reports import generate_automated_reports
from automation.alerts import generate_smart_alerts
from automation.ai_context import refresh_ai_context

logging.basicConfig(level=logging.INFO)


def main():

    print("\n===================================")
    print("🚀 Starting Automation Pipeline")
    print("===================================\n")

    # ----------------------------------------
    # 1. MongoDB -> Snowflake Sync
    # ----------------------------------------

    sync_status = sync_all()

    # ----------------------------------------
    # 2. Refresh Analytics Cache
    # ----------------------------------------

    analytics_success = refresh_analytics_cache()

    # ----------------------------------------
    # 3. Generate Reports
    # ----------------------------------------

    if analytics_success:
        report_success = generate_automated_reports()
    else:
        report_success = False

    # ----------------------------------------
    # 4. Generate Smart Alerts
    # ----------------------------------------

    alert_success = generate_smart_alerts()

    # ----------------------------------------
    # 5. Refresh AI Context
    # ----------------------------------------

    ai_context_success = refresh_ai_context()

    print("\n===================================")
    print("✅ Automation Pipeline Finished")
    print("===================================\n")

    print(f"Sync Status      : {sync_status}")
    print(f"Analytics Status : {analytics_success}")
    print(f"Report Status    : {report_success}")
    print(f"Alerts Status    : {alert_success}")
    print(f"AI Context       : {ai_context_success}")


if __name__ == "__main__":
    main()
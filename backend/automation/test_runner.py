import logging
import os
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from automation.analytics import refresh_analytics_cache
from automation.reports import generate_automated_reports
from automation.sync import sync_mongodb_to_snowflake
from automation.alerts import generate_smart_alerts
from automation.ai_context import refresh_ai_context

logging.basicConfig(level=logging.INFO)


def main():
    print("--- 🚀 Starting Automation Test ---")

    sync_status = sync_mongodb_to_snowflake()
    analytics_success = refresh_analytics_cache()

    if analytics_success:
        report_success = generate_automated_reports()
    else:
        report_success = False

    alert_success = generate_smart_alerts()
    ai_context_success = refresh_ai_context()

    print(f"Sync Status: {sync_status}")
    print(f"Analytics Status: {analytics_success}")
    print(f"Report Status: {report_success}")
    print(f"Alerts Status: {alert_success}")
    print(f"AI Context Status: {ai_context_success}")


if __name__ == "__main__":
    main()
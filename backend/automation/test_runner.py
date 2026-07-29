import logging
from automation.analytics import refresh_analytics_cache
from automation.reports import generate_automated_reports

logging.basicConfig(level=logging.INFO)

def main():
    print("--- 🚀 Starting Analytics & Reports Automation Test ---")
    
    # 1. Run KPI Refresh
    analytics_success = refresh_analytics_cache()
    
    # 2. Run Report Generation if analytics succeeded
    if analytics_success:
        report_success = generate_automated_reports()
        print(f"--- Finished! Report Status: {report_success} ---")
    else:
        print("--- Analytics Refresh Failed. Skipping Report Generation. ---")

if __name__ == "__main__":
    main()
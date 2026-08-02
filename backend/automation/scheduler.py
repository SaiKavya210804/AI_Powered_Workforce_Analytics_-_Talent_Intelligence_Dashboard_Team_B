"""
Runs the automation pipeline automatically.
"""

import time
from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

from automation.sync import sync_all
from automation.analytics import refresh_analytics_cache
from automation.reports import generate_automated_reports
from automation.alerts import generate_smart_alerts
from automation.ai_context import refresh_ai_context

from automation.logger import (
    log_info,
    log_error,
)

from app.config import (
    SCHEDULER_INTERVAL_MINUTES,
    AUTOMATION_RETRY_ATTEMPTS,
    AUTOMATION_RETRY_DELAY_SECONDS,
)

_scheduler = None


def run_pipeline():

    log_info("==========================================")
    log_info("Starting Automation Pipeline...")
    log_info("==========================================")

    def _safe_run(step_name, step_callable):

        attempts = AUTOMATION_RETRY_ATTEMPTS
        delay = AUTOMATION_RETRY_DELAY_SECONDS

        for attempt in range(1, attempts + 1):

            try:

                log_info(
                    f"Running {step_name} (Attempt {attempt}/{attempts})"
                )

                result = step_callable()

                if result:
                    return True

                raise RuntimeError(
                    f"{step_name} returned False"
                )

            except Exception as e:

                log_error(
                    f"{step_name} failed on attempt {attempt}: {str(e)}"
                )

                if attempt < attempts:

                    log_info(
                        f"Retrying in {delay} seconds..."
                    )

                    time.sleep(delay)

                else:

                    log_error(
                        f"{step_name} failed after {attempts} attempts."
                    )

                    return False

    # --------------------------------------------------
    # 1. MongoDB -> Snowflake Sync
    # --------------------------------------------------

    sync_success = _safe_run(
        "MongoDB -> Snowflake Sync",
        sync_all
    )

    # --------------------------------------------------
    # 2. Analytics
    # --------------------------------------------------

    analytics_success = _safe_run(
        "Analytics Refresh",
        refresh_analytics_cache
    )

    # --------------------------------------------------
    # 3. Reports
    # --------------------------------------------------

    if analytics_success:

        report_success = _safe_run(
            "Report Generation",
            generate_automated_reports
        )

    else:

        report_success = False

    # --------------------------------------------------
    # 4. Smart Alerts
    # --------------------------------------------------

    alert_success = _safe_run(
        "Smart Alert Generation",
        generate_smart_alerts
    )

    # --------------------------------------------------
    # 5. AI Context
    # --------------------------------------------------

    ai_context_success = _safe_run(
        "AI Context Refresh",
        refresh_ai_context
    )

    # --------------------------------------------------

    if (
        sync_success
        and analytics_success
        and report_success
        and alert_success
        and ai_context_success
    ):

        log_info("Automation Pipeline completed successfully.")

    else:

        log_error(
            "Automation Pipeline completed with failures."
        )


def start_scheduler(interval_minutes=None):

    global _scheduler

    if _scheduler and _scheduler.running:
        return _scheduler

    minutes = interval_minutes or SCHEDULER_INTERVAL_MINUTES

    _scheduler = BackgroundScheduler()

    _scheduler.add_job(
        run_pipeline,
        trigger=IntervalTrigger(minutes=minutes),
        id="workforce_automation",
        name="Workforce Automation Pipeline",
        replace_existing=True,
        next_run_time=datetime.now(),
    )

    _scheduler.start()

    log_info(
        f"Automation Scheduler started. Running every {minutes} minute(s)."
    )

    return _scheduler


def stop_scheduler():

    global _scheduler

    if _scheduler and _scheduler.running:

        _scheduler.shutdown(wait=False)

        log_info("Automation Scheduler stopped.")

    _scheduler = None


if __name__ == "__main__":

    start_scheduler()

    try:

        while True:
            time.sleep(60)

    except KeyboardInterrupt:

        stop_scheduler()
import logging
import os
import sys
import time
from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from automation.analytics import refresh_analytics_cache
from automation.reports import generate_automated_reports
from automation.sync import sync_mongodb_to_snowflake
from automation.alerts import generate_smart_alerts
from automation.ai_context import refresh_ai_context
from app.config import SCHEDULER_INTERVAL_MINUTES, AUTOMATION_RETRY_ATTEMPTS, AUTOMATION_RETRY_DELAY_SECONDS

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("scheduler")

_scheduler = None


def run_pipeline():
    logger.info("==========================================")
    logger.info("🚀 [Scheduler] Starting Automation Pipeline...")
    logger.info("==========================================")

    def _safe_run(step_name: str, step_callable):
        attempts = AUTOMATION_RETRY_ATTEMPTS
        delay = AUTOMATION_RETRY_DELAY_SECONDS
        for attempt in range(1, attempts + 1):
            try:
                logger.info("🔧 [Scheduler] Running %s (attempt %s/%s)", step_name, attempt, attempts)
                result = step_callable()
                if result:
                    return True
                raise RuntimeError(f"{step_name} returned false")
            except Exception as exc:
                logger.exception("❌ [Scheduler] %s failed on attempt %s: %s", step_name, attempt, exc)
                if attempt < attempts:
                    logger.info("⏳ Retrying %s in %s seconds...", step_name, delay)
                    time.sleep(delay)
                else:
                    logger.error("💥 [Scheduler] %s failed after %s attempts.", step_name, attempts)
                    return False

    logger.info("1. [Sync] Synchronizing MongoDB data to Snowflake...")
    sync_success = _safe_run("MongoDB -> Snowflake sync", sync_mongodb_to_snowflake)

    logger.info("2. [Analytics] Recalculating workforce KPIs...")
    analytics_success = _safe_run("Analytics cache refresh", refresh_analytics_cache)

    if analytics_success:
        logger.info("3. [Reports] Exporting CSV and JSON reports...")
        report_success = _safe_run("Report generation", generate_automated_reports)
    else:
        report_success = False

    logger.info("4. [Alerts] Generating smart alerts...")
    alert_success = _safe_run("Alert generation", generate_smart_alerts)

    logger.info("5. [AI] Refreshing AI context...")
    ai_context_success = _safe_run("AI context refresh", refresh_ai_context)

    if sync_success and analytics_success and report_success and alert_success and ai_context_success:
        logger.info("✅ Pipeline finished successfully!\n")
    else:
        logger.warning("⚠️ Pipeline completed with one or more skipped/failed steps.")


def start_scheduler(interval_minutes: int | None = None):
    global _scheduler
    if _scheduler and _scheduler.running:
        return _scheduler

    minutes = interval_minutes or SCHEDULER_INTERVAL_MINUTES
    _scheduler = BackgroundScheduler()
    _scheduler.add_job(
        run_pipeline,
        trigger=IntervalTrigger(minutes=minutes),
        id="workforce-automation",
        name="Workforce automation pipeline",
        replace_existing=True,
        next_run_time=datetime.now(),
    )
    _scheduler.start()
    logger.info("🕒 Scheduler started; next run in %s minute(s).", minutes)
    return _scheduler


def stop_scheduler():
    global _scheduler
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
    _scheduler = None


if __name__ == "__main__":
    start_scheduler()
    try:
        import time
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        stop_scheduler()
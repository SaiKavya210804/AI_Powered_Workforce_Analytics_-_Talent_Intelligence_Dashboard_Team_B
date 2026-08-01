"""
Runs synchronization automatically.
"""

from apscheduler.schedulers.background import BackgroundScheduler

from automation.sync import sync_all
from automation.logger import log_info, log_error


scheduler = BackgroundScheduler()


def start_scheduler():

    try:

        scheduler.add_job(
            sync_all,
            "interval",
            seconds=10,
            id="mongodb_snowflake_sync",
            replace_existing=True
        )

        scheduler.start()

        log_info("Automation scheduler started")

    except Exception as e:

        log_error(
            f"Scheduler failed: {str(e)}"
        )
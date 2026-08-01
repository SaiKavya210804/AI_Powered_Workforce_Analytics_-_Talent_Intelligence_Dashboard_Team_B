"""
logger.py

Handles logging for automation processes.
"""

import logging
import os


LOG_FOLDER = "logs"


if not os.path.exists(LOG_FOLDER):
    os.makedirs(LOG_FOLDER)


logging.basicConfig(
    filename=os.path.join(
        LOG_FOLDER,
        "automation.log"
    ),
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)


def log_info(message: str):

    logging.info(message)



def log_error(message: str):

    logging.error(message)



def log_warning(message: str):

    logging.warning(message)
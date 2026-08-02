"""
Stores synchronization history.
"""

from datetime import datetime

# Stores synchronization history for the current application session.
sync_records = []


def save_sync_history(
    inserted,
    updated,
    deleted,
    status
):
    """
    Save the result of a synchronization run.
    """

    record = {
        "time": datetime.now().isoformat(),
        "inserted": inserted,
        "updated": updated,
        "deleted": deleted,
        "status": status,
    }

    sync_records.append(record)


def get_sync_history():
    """
    Return all synchronization history records.
    """

    return sync_records
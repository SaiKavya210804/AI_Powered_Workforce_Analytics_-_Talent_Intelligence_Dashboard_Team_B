"""
Stores synchronization history.
"""


from datetime import datetime


sync_records = []



def save_sync_history(
        inserted,
        updated,
        deleted,
        status
):

    record = {

        "time": datetime.now(),

        "inserted": inserted,

        "updated": updated,

        "deleted": deleted,

        "status": status
    }


    sync_records.append(record)



def get_sync_history():

    return sync_records
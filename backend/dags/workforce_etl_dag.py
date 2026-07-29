import sys
from pathlib import Path
from datetime import datetime, timedelta
import logging

# Add 'app' directory to sys.path so Airflow can locate backend modules
sys.path.append(str(Path(__file__).resolve().parent.parent / "app"))

from airflow import DAG
from airflow.operators.python import PythonOperator

# Import backend clients and database functions
try:
    from database import get_db
    from snowflake_client import SnowflakeClient
except ImportError as e:
    logging.warning(f"Backend module import notice: {e}")

# Default arguments for the DAG tasks
default_args = {
    'owner': 'team_b',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# Task functions integrating backend logic
def extract_mongodb_data():
    logging.info("Extracting latest workforce data from MongoDB...")
    # Add your MongoDB extraction logic here using get_db()

def transform_workforce_analytics():
    logging.info("Processing workforce metrics and calculations...")
    # Add data transformation/formatting logic here

def load_to_snowflake():
    logging.info("Uploading processed analytics data to Snowflake...")
    # Add load logic here using SnowflakeClient()

# Instantiate the DAG
with DAG(
    'workforce_analytics_etl_pipeline',
    default_args=default_args,
    description='Automated ETL pipeline for AI-Powered Workforce Analytics',
    schedule_interval='@daily',
    start_date=datetime(2026, 1, 1),
    catchup=False,
    tags=['workforce', 'phase8', 'automation'],
) as dag:

    task_extract = PythonOperator(
        task_id='extract_mongodb',
        python_callable=extract_mongodb_data,
    )

    task_transform = PythonOperator(
        task_id='transform_analytics',
        python_callable=transform_workforce_analytics,
    )

    task_load = PythonOperator(
        task_id='load_snowflake',
        python_callable=load_to_snowflake,
    )

    task_extract >> task_transform >> task_load


if __name__ == "__main__":
    extract_mongodb_data()
    transform_workforce_analytics()
    load_to_snowflake()
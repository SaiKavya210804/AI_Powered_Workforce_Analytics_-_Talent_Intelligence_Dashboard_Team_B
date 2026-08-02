from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()


def _get_env_int(name: str, default: int) -> int:
	value = os.getenv(name, str(default))
	try:
		return int(value)
	except (TypeError, ValueError):
		return default

# MongoDB connection string
MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_SERVER_SELECTION_TIMEOUT_MS = _get_env_int("MONGODB_SERVER_SELECTION_TIMEOUT_MS", 5000)

SNOWFLAKE_ACCOUNT = os.getenv("SNOWFLAKE_ACCOUNT")
SNOWFLAKE_USER = os.getenv("SNOWFLAKE_USER")
SNOWFLAKE_PASSWORD = os.getenv("SNOWFLAKE_PASSWORD")
SNOWFLAKE_WAREHOUSE = os.getenv("SNOWFLAKE_WAREHOUSE")
SNOWFLAKE_DATABASE = os.getenv("SNOWFLAKE_DATABASE")
SNOWFLAKE_SCHEMA = os.getenv("SNOWFLAKE_SCHEMA")

SCHEDULER_INTERVAL_MINUTES = _get_env_int("SCHEDULER_INTERVAL_MINUTES", 5)
AUTOMATION_RETRY_ATTEMPTS = _get_env_int("AUTOMATION_RETRY_ATTEMPTS", 3)
AUTOMATION_RETRY_DELAY_SECONDS = _get_env_int("AUTOMATION_RETRY_DELAY_SECONDS", 10)

APP_HOST = os.getenv("APP_HOST", "127.0.0.1")
APP_PORT = _get_env_int("APP_PORT", 8000)
UVICORN_RELOAD = os.getenv("UVICORN_RELOAD", "false").lower() in ("1", "true", "yes")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
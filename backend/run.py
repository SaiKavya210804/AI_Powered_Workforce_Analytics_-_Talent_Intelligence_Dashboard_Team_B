import uvicorn

from automation.scheduler import start_scheduler, stop_scheduler
from app.config import APP_HOST, APP_PORT, UVICORN_RELOAD


def main():
    start_scheduler()
    try:
        uvicorn.run(
            "app.main:app",
            host=APP_HOST,
            port=APP_PORT,
            reload=UVICORN_RELOAD,
        )
    finally:
        stop_scheduler()


if __name__ == "__main__":
    main()
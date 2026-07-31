import logging
from datetime import datetime

from app.database import db

logger = logging.getLogger("automation")


def refresh_ai_context():
    """Store a lightweight AI context snapshot for the assistant."""
    logger.info("🤖 [AI Context] Refreshing AI context snapshot...")

    try:
        summary = db.analytics_cache.find_one({"_id": "latest_summary"})
        if not summary:
            logger.warning("⚠️ [AI Context] No analytics summary available to build AI context.")
            return False

        context_payload = {
            "summary": summary,
            "generated_at": datetime.now().isoformat(),
        }

        db.ai_context_cache.replace_one(
            {"_id": "latest_context"},
            {"_id": "latest_context", **context_payload},
            upsert=True,
        )

        logger.info("✅ [AI Context] AI context refreshed successfully.")
        return True

    except Exception as exc:
        logger.error(f"❌ [AI Context] Failed to refresh context: {exc}")
        return False

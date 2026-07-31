import logging
from datetime import datetime

from app.database import db

logger = logging.getLogger("automation")


def generate_smart_alerts():
    """Generate simple smart alerts based on the latest analytics summary."""
    logger.info("🔔 [Alerts] Generating smart alerts...")

    try:
        summary = db.analytics_cache.find_one({"_id": "latest_summary"})
        alerts = []

        if not summary:
            logger.warning("⚠️ [Alerts] No analytics summary available yet.")
            return False

        attrition_rate = float(summary.get("attrition_rate", 0) or 0)
        if attrition_rate > 15:
            alerts.append(
                {
                    "type": "attrition",
                    "message": f"Attrition rate is above the threshold ({attrition_rate}%).",
                    "severity": "high",
                }
            )

        avg_salary = float(summary.get("avg_salary", 0) or 0)
        if avg_salary < 5000:
            alerts.append(
                {
                    "type": "salary",
                    "message": f"Average salary is below the expected benchmark ({avg_salary}).",
                    "severity": "medium",
                }
            )

        db.alerts_cache.replace_one(
            {"_id": "latest_alerts"},
            {
                "_id": "latest_alerts",
                "alerts": alerts,
                "generated_at": datetime.now().isoformat(),
            },
            upsert=True,
        )

        logger.info(f"✅ [Alerts] Generated {len(alerts)} alert(s).")
        return True

    except Exception as exc:
        logger.error(f"❌ [Alerts] Failed to generate alerts: {exc}")
        return False

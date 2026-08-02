"""
Smart Alerts Automation

This module evaluates workforce analytics data against predefined
thresholds and generates High, Medium, or Low priority alerts.

This module does not calculate or modify analytics.
It only consumes analytics data and generates alerts.

Expected analytics data may contain:

    {
        "attrition_rate": 18.5,

        "department_attrition": {
            "IT": 25.0,
            "HR": 12.0
        },

        "job_satisfaction": 2.5,

        "work_life_balance": 3.0
    }

It can also consume the current analytics cache format:

    {
        "total_employees": 1000,
        "attrition_count": 150,
        "attrition_rate": 15.0,
        "avg_salary": 50000,
        "department_distribution": [
            {"department": "IT", "count": 500},
            {"department": "HR", "count": 200}
        ],
        "updated_at": "..."
    }
"""

from app.database import db
from datetime import datetime
from typing import Any, Dict, List, Optional


# -------------------------------------------------------------------
# LOGGER
# -------------------------------------------------------------------

try:
    from .logger import log_info, log_warning, log_error
except ImportError:
    from logger import log_info, log_warning, log_error


# -------------------------------------------------------------------
# ALERT THRESHOLDS
# -------------------------------------------------------------------

# These are default project thresholds.
# Change only if your team has officially defined different values.

THRESHOLDS = {
    # Overall attrition is represented as a percentage.
    "attrition": {
        "high": 20.0,
        "medium": 10.0,
    },

    # Department attrition is represented as a percentage.
    "department_attrition": {
        "high": 25.0,
        "medium": 15.0,
    },

    # Job satisfaction is assumed to be on a 1-5 scale.
    "job_satisfaction": {
        "high": 2.0,
        "medium": 3.0,
    },

    # Work-life balance is assumed to be on a 1-5 scale.
    "work_life_balance": {
        "high": 2.0,
        "medium": 3.0,
    },
}


# -------------------------------------------------------------------
# HELPER FUNCTIONS
# -------------------------------------------------------------------

def _safe_float(value: Any) -> Optional[float]:
    """
    Safely convert a value to float.

    Returns:
        float: Converted value.
        None: If conversion is not possible.
    """

    try:
        if value is None:
            return None

        return float(value)

    except (TypeError, ValueError):
        return None


def _create_alert(
    metric: str,
    priority: str,
    message: str,
    value: Any,
    threshold: Any,
    department: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Create a standardized Smart Alert object.
    """

    return {
        "metric": metric,
        "priority": priority,
        "message": message,
        "value": value,
        "threshold": threshold,
        "department": department,
        "created_at": datetime.now().isoformat(),
    }


# -------------------------------------------------------------------
# OVERALL ATTRITION ALERT
# -------------------------------------------------------------------

def check_attrition(
    attrition_rate: Any,
) -> Optional[Dict[str, Any]]:
    """
    Evaluate overall workforce attrition.

    High:
        attrition >= 20%

    Medium:
        attrition >= 10%

    No alert:
        attrition < 10%
    """

    value = _safe_float(attrition_rate)

    if value is None:
        log_warning(
            "Smart Alerts: Overall attrition rate is missing or invalid."
        )
        return None

    if value >= THRESHOLDS["attrition"]["high"]:

        alert = _create_alert(
            metric="overall_attrition",
            priority="High",
            message=(
                f"Overall workforce attrition is critically high "
                f"at {value}%."
            ),
            value=value,
            threshold=THRESHOLDS["attrition"]["high"],
        )

        log_warning(
            f"High attrition alert generated: {value}%"
        )

        return alert

    if value >= THRESHOLDS["attrition"]["medium"]:

        alert = _create_alert(
            metric="overall_attrition",
            priority="Medium",
            message=(
                f"Overall workforce attrition is above the "
                f"recommended level at {value}%."
            ),
            value=value,
            threshold=THRESHOLDS["attrition"]["medium"],
        )

        log_warning(
            f"Medium attrition alert generated: {value}%"
        )

        return alert

    return None


# -------------------------------------------------------------------
# DEPARTMENT ATTRITION ALERT
# -------------------------------------------------------------------

def check_department_attrition(
    department_attrition: Any,
) -> List[Dict[str, Any]]:
    """
    Evaluate department-wise attrition.

    Expected input:

        {
            "IT": 28.0,
            "HR": 12.0,
            "Finance": 8.0
        }

    Returns:
        List of generated department attrition alerts.
    """

    alerts = []

    if not department_attrition:

        log_info(
            "Smart Alerts: No department attrition data available."
        )

        return alerts

    if not isinstance(department_attrition, dict):

        log_warning(
            "Smart Alerts: Department attrition data must be a dictionary."
        )

        return alerts

    for department, attrition_rate in department_attrition.items():

        value = _safe_float(attrition_rate)

        if value is None:

            log_warning(
                f"Smart Alerts: Invalid attrition value "
                f"for department '{department}'."
            )

            continue

        if value >= THRESHOLDS["department_attrition"]["high"]:

            alert = _create_alert(
                metric="department_attrition",
                priority="High",
                message=(
                    f"{department} department has critically high "
                    f"attrition of {value}%."
                ),
                value=value,
                threshold=THRESHOLDS[
                    "department_attrition"
                ]["high"],
                department=department,
            )

            alerts.append(alert)

            log_warning(
                f"High department attrition alert: "
                f"{department} = {value}%"
            )

        elif value >= THRESHOLDS["department_attrition"]["medium"]:

            alert = _create_alert(
                metric="department_attrition",
                priority="Medium",
                message=(
                    f"{department} department has elevated "
                    f"attrition of {value}%."
                ),
                value=value,
                threshold=THRESHOLDS[
                    "department_attrition"
                ]["medium"],
                department=department,
            )

            alerts.append(alert)

            log_warning(
                f"Medium department attrition alert: "
                f"{department} = {value}%"
            )

    return alerts


# -------------------------------------------------------------------
# JOB SATISFACTION ALERT
# -------------------------------------------------------------------

def check_job_satisfaction(
    satisfaction: Any,
) -> Optional[Dict[str, Any]]:
    """
    Evaluate job satisfaction.

    Assumes a 1-5 scale.

    High:
        satisfaction <= 2

    Medium:
        satisfaction <= 3

    No alert:
        satisfaction > 3
    """

    value = _safe_float(satisfaction)

    if value is None:

        log_info(
            "Smart Alerts: Job satisfaction data is not available."
        )

        return None

    if value <= THRESHOLDS["job_satisfaction"]["high"]:

        alert = _create_alert(
            metric="job_satisfaction",
            priority="High",
            message=(
                f"Employee job satisfaction is critically low "
                f"at {value}/5."
            ),
            value=value,
            threshold=THRESHOLDS[
                "job_satisfaction"
            ]["high"],
        )

        log_warning(
            f"High job satisfaction alert generated: {value}/5"
        )

        return alert

    if value <= THRESHOLDS["job_satisfaction"]["medium"]:

        alert = _create_alert(
            metric="job_satisfaction",
            priority="Medium",
            message=(
                f"Employee job satisfaction is below the "
                f"recommended level at {value}/5."
            ),
            value=value,
            threshold=THRESHOLDS[
                "job_satisfaction"
            ]["medium"],
        )

        log_warning(
            f"Medium job satisfaction alert generated: {value}/5"
        )

        return alert

    return None


# -------------------------------------------------------------------
# WORK-LIFE BALANCE ALERT
# -------------------------------------------------------------------

def check_work_life_balance(
    work_life_balance: Any,
) -> Optional[Dict[str, Any]]:
    """
    Evaluate work-life balance.

    Assumes a 1-5 scale.

    High:
        work-life balance <= 2

    Medium:
        work-life balance <= 3

    No alert:
        work-life balance > 3
    """

    value = _safe_float(work_life_balance)

    if value is None:

        log_info(
            "Smart Alerts: Work-life balance data is not available."
        )

        return None

    if value <= THRESHOLDS["work_life_balance"]["high"]:

        alert = _create_alert(
            metric="work_life_balance",
            priority="High",
            message=(
                f"Employee work-life balance is critically low "
                f"at {value}/5."
            ),
            value=value,
            threshold=THRESHOLDS[
                "work_life_balance"
            ]["high"],
        )

        log_warning(
            f"High work-life balance alert generated: {value}/5"
        )

        return alert

    if value <= THRESHOLDS["work_life_balance"]["medium"]:

        alert = _create_alert(
            metric="work_life_balance",
            priority="Medium",
            message=(
                f"Employee work-life balance is below the "
                f"recommended level at {value}/5."
            ),
            value=value,
            threshold=THRESHOLDS[
                "work_life_balance"
            ]["medium"],
        )

        log_warning(
            f"Medium work-life balance alert generated: {value}/5"
        )

        return alert

    return None


# -------------------------------------------------------------------
# MAIN SMART ALERT GENERATOR
# -------------------------------------------------------------------

def generate_smart_alerts(
    analytics_data: Optional[Dict[str, Any]] = None,
) -> bool:
    """
    Generate Smart Alerts from existing analytics data.

    This function does NOT calculate analytics.
    It only evaluates existing analytics results.

    Supported fields:

        attrition_rate
        department_attrition
        job_satisfaction
        work_life_balance

    Example:

        analytics_data = {
            "attrition_rate": 18.5,

            "department_attrition": {
                "IT": 28.0,
                "HR": 12.0
            },

            "job_satisfaction": 2.5,

            "work_life_balance": 3.0
        }

    Returns:
        True if alert generation completed successfully,
        otherwise False.
    """

    alerts = []

    try:

        if analytics_data is None:

            summary = db.analytics_cache.find_one(
                {"_id": "latest_summary"}
            )

            if not summary:

                log_warning(
                    "No analytics summary found."
                )

                return False

            analytics_data = summary

        if not isinstance(analytics_data, dict):

            log_error(
                "Smart Alerts failed: analytics data must be a dictionary."
            )

            return False

        log_info(
            "Smart Alerts evaluation started."
        )

        # -----------------------------------------------------------
        # 1. Overall Attrition
        # -----------------------------------------------------------

        attrition_rate = analytics_data.get(
            "attrition_rate"
        )

        attrition_alert = check_attrition(
            attrition_rate
        )

        if attrition_alert:
            alerts.append(attrition_alert)

        # -----------------------------------------------------------
        # 2. Department Attrition
        # -----------------------------------------------------------

        department_attrition = analytics_data.get(
            "department_attrition"
        )

        department_alerts = check_department_attrition(
            department_attrition
        )

        alerts.extend(department_alerts)

        # -----------------------------------------------------------
        # 3. Job Satisfaction
        # -----------------------------------------------------------

        job_satisfaction = analytics_data.get(
            "job_satisfaction"
        )

        satisfaction_alert = check_job_satisfaction(
            job_satisfaction
        )

        if satisfaction_alert:
            alerts.append(satisfaction_alert)

        # -----------------------------------------------------------
        # 4. Work-Life Balance
        # -----------------------------------------------------------

        work_life_balance = analytics_data.get(
            "work_life_balance"
        )

        work_life_alert = check_work_life_balance(
            work_life_balance
        )

        if work_life_alert:
            alerts.append(work_life_alert)

        # -----------------------------------------------------------
        # Final Result
        # -----------------------------------------------------------

        db.alerts_cache.replace_one(
            {"_id": "latest_alerts"},
            {
                "_id": "latest_alerts",
                "alerts": alerts,
                "analytics_updated_at": analytics_data.get("updated_at"),
                "generated_at": datetime.now().isoformat(),
            },
            upsert=True,
        )

        log_info(
            f"Smart Alerts evaluation completed. "
            f"{len(alerts)} alert(s) generated."
        )

        return True

    except Exception as error:

        log_error(
            f"Smart Alerts generation failed: {error}"
        )

        return False


# -------------------------------------------------------------------
# OPTIONAL TESTING
# -------------------------------------------------------------------

if __name__ == "__main__":

    test_analytics_data = {
        "attrition_rate": 22.5,
        "department_attrition": {
            "IT": 28.0,
            "HR": 12.0,
            "Finance": 8.0,
        },
        "job_satisfaction": 2.0,
        "work_life_balance": 2.5,
    }

    success = generate_smart_alerts(
        test_analytics_data
    )

    print(f"Smart Alerts Generated: {success}")
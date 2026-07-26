import "./AlertCard.css";

import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AlertCard({
  title,
  message,
  priority,
  timestamp
}) {
    let icon;

if (priority === "High") {
  icon = <ErrorIcon color="error" />;
} else if (priority === "Medium") {
  icon = <WarningAmberIcon color="warning" />;
} else {
  icon = <CheckCircleIcon color="success" />;
}
  return (
    <div className={`alert-card ${priority.toLowerCase()}`}>
      <h3>
        {icon} {title}
     </h3>

      <p>{message}</p>

      <span>
        Priority: {priority}
      </span>
      <p className="alert-time">
        Generated: {timestamp}
        </p>
    </div>
  );
}

export default AlertCard;
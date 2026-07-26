import "./AlertCard.css";

function AlertCard({ title, message, priority }) {
  return (
    <div className={`alert-card ${priority.toLowerCase()}`}>
      <h3>{title}</h3>

      <p>{message}</p>

      <span>
        Priority: {priority}
      </span>
    </div>
  );
}

export default AlertCard;
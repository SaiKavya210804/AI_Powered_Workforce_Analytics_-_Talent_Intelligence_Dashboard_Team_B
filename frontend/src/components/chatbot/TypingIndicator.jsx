import "./TypingIndicator.css";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function TypingIndicator() {
  return (
    <div className="typing-container">

      <div className="typing-avatar">
        <SmartToyIcon />
      </div>

      <div className="typing-box">

        <span className="typing-text">
          AI is analyzing workforce data
        </span>

        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;
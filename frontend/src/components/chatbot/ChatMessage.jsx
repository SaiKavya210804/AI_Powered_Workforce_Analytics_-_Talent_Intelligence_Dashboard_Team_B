import "./ChatMessage.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

function ChatMessage({ message, sender }) {

  const isAI = sender === "ai";

  return (

    <div className={`message-row ${isAI ? "ai-row" : "user-row"}`}>

      {isAI && (
        <div className="avatar ai-avatar">
          <SmartToyIcon />
        </div>
      )}

      <div className="message-content">

        <span className="sender-name">
          {isAI ? "AI Assistant" : "You"}
        </span>

        <div
          className={`message ${
            isAI ? "ai-message" : "user-message"
          }`}
        >
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>

      </div>

      {!isAI && (
        <div className="avatar user-avatar">
          <PersonIcon />
        </div>
      )}

    </div>

  );
}

export default ChatMessage;
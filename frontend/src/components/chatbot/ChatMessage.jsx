import "./ChatMessage.css";
import ReactMarkdown from "react-markdown";

function ChatMessage({ message, sender }) {
  return (
    <div className={`message ${sender}`}>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
}

export default ChatMessage;
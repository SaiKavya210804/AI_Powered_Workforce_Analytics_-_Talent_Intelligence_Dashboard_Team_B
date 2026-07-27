import ChatMessage from "./ChatMessage";
import "./ChatHistory.css";

function ChatHistory({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          message={msg.message}
          sender={msg.sender}
        />
      ))}
    </div>
  );
}

export default ChatHistory;
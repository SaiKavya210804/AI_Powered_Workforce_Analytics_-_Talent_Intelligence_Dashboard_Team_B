import "./ChatMessage.css";

function ChatMessage({ message, sender }) {
  return (
    <div className={`message ${sender}`}>
      <p>{message}</p>
    </div>
  );
}

export default ChatMessage;
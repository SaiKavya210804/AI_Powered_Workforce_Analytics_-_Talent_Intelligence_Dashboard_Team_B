import { useState } from "react";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="chat-input-container">
      <textarea
        rows="3"
        placeholder="Ask something about your workforce..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
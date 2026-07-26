import "./ChatInput.css";

function ChatInput({ value, onChange, onSend }) {

  return (
    <div className="chat-input-container">

      <textarea
        rows="3"
        placeholder="Ask something about your workforce..."
        value={value}
        onChange={onChange}
      />

      <button onClick={onSend}>
        Send
      </button>

    </div>
  );
}

export default ChatInput;
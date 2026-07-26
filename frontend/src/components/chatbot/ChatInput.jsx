import "./ChatInput.css";

function ChatInput({

  value,

  onChange,

  onSend

}) {

  const handleSend = () => {

    if (!value.trim()) return;

    onSend();

  };

  return (

    <div className="chat-input-container">

      <textarea

        rows="3"

        placeholder="Ask something about your workforce..."

        value={value}

        onChange={onChange}

        onKeyDown={(e) => {

          if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSend();

          }

        }}

      />

      <button onClick={handleSend}>
        Send
      </button>

    </div>

  );

}

export default ChatInput;
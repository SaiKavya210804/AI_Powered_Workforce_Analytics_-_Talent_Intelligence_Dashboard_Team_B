import { useState } from "react";
import { askAI } from "../../services/aiService";

import ChatInput from "../../components/chatbot/ChatInput";
import ChatHistory from "../../components/chatbot/ChatHistory";
import TypingIndicator from "../../components/chatbot/TypingIndicator";

function AIAssistant() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message: "Hello! How can I help you with workforce analytics today?"
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    // Add user's message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: userQuestion,
      },
    ]);

    // Clear input
    setQuestion("");

    setLoading(true);

    try {
      const response = await askAI(userQuestion);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: response.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Workforce Assistant</h1>

      <ChatHistory messages={messages} />

      {loading && <TypingIndicator />}

      <ChatInput
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onSend={handleAsk}
      />
    </div>
  );
}

export default AIAssistant;
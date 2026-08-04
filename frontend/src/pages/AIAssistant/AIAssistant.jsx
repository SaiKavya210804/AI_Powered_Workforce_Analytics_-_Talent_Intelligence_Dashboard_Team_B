import { useState, useEffect, useRef } from "react";
import { askAI } from "../../services/aiService";

import ChatInput from "../../components/chatbot/ChatInput";
import ChatHistory from "../../components/chatbot/ChatHistory";
import TypingIndicator from "../../components/chatbot/TypingIndicator";

import { Button } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function AIAssistant() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message: "Hello! How can I help you with workforce analytics today?"
    }
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    "Show overall attrition rate",
    "Generate employee summary",
    "Show salary analytics",
    "Show job satisfaction",
    "Show work-life balance"
  ];

  const handleAsk = async (customQuestion = null) => {

    const userQuestion = customQuestion || question;

    if (!userQuestion.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: userQuestion
      }
    ]);

    setQuestion("");

    setLoading(true);

    try {

      const response = await askAI(userQuestion);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: response.answer
        }
      ]);

    } catch (error) {
  console.error("AI Error:", error);

  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      message: "Something went wrong. Please try again."
    }
  ]);
}

    setLoading(false);

  };

  const handleClearChat = () => {

    setMessages([
      {
        sender: "ai",
        message: "Hello! How can I help you with workforce analytics today?"
      }
    ]);

  };

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  return (

    <div style={{ padding: "30px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >

        <h1>AI Workforce Assistant</h1>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={handleClearChat}
        >
          Clear Chat
        </Button>

      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px"
        }}
      >

        {suggestedQuestions.map((item, index) => (

          <Button
            key={index}
            variant="outlined"
            size="small"
            onClick={() => handleAsk(item)}
          >
            {item}
          </Button>

        ))}

      </div>

      <ChatHistory messages={messages} />

      {loading && <TypingIndicator />}

      <div ref={chatEndRef}></div>

      <ChatInput
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onSend={handleAsk}
      />

    </div>

  );

}

export default AIAssistant;
import { useState } from "react";
import { askAI } from "../../services/aiService";
import ChatInput from "../../components/chatbot/ChatInput";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await askAI(question);
      setAnswer(response.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Workforce Assistant</h1>

      <textarea
        rows="4"
        cols="70"
        placeholder="Ask something about your workforce..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAsk}>
        
      </button>

      <br />
      <br />

      {loading && <p>Thinking...</p>}

      {!loading && answer && (
        <>
          <h3>Answer</h3>
          <p>{answer}</p>
        </>
      )}
    </div>
  );
}

export default AIAssistant;
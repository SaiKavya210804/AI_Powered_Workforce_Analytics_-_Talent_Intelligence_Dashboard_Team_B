import { useState, useEffect, useRef } from "react";
import "./AIAssistant.css";
import { askAI } from "../../services/aiService";

import ChatInput from "../../components/chatbot/ChatInput";
import ChatHistory from "../../components/chatbot/ChatHistory";
import TypingIndicator from "../../components/chatbot/TypingIndicator";


import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import BalanceIcon from "@mui/icons-material/Balance";
import { Typography } from "@mui/material";

function AIAssistant() {


  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message:
        "Hello! How can I help you with workforce analytics today?"
    }
  ]);


  const [loading, setLoading] = useState(false);


  const chatEndRef = useRef(null);



  const suggestedQuestions = [
  {
    title: "Attrition",
    question: "View attrition insights",
    icon: <TrendingDownIcon />
  },
  {
    title: "Employees",
    question: "Generate employee summary",
    icon: <PeopleIcon />
  },
  {
    title: "Salary",
    question: "Analyze salary distribution",
    icon: <PaymentsIcon />
  },
  {
    title: "Satisfaction",
    question: "View satisfaction trends",
    icon: <SentimentSatisfiedIcon />
  },
  {
    title: "Work-Life",
    question: "Analyze work-life balance",
    icon: <BalanceIcon />
  }
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



    } catch(error) {


      console.error(error);


      setMessages((prev)=>[

        ...prev,

        {
          sender:"ai",
          message:"Something went wrong. Please try again."
        }

      ]);


    }



    setLoading(false);


  };




  const handleClearChat = () => {


    setMessages([

      {
        sender:"ai",
        message:
        "Hello! How can I help you with workforce analytics today?"
      }

    ]);

  };





  useEffect(()=>{

    chatEndRef.current?.scrollIntoView({

      behavior:"smooth"

    });


  },[messages]);






  return (
  <div className="ai-page">

    {/* Header */}
    <div className="ai-header">

    <div className="header-left">

        <div className="ai-logo">

            <SmartToyRoundedIcon />

        </div>

        <div>

            <Typography className="ai-title">

                AI Workforce Assistant

            </Typography>

            <div className="status-row">

                <FiberManualRecordIcon className="status-dot" />

                <Typography className="status-text">

                    Gemini Connected

                </Typography>

            </div>

        </div>

    </div>

    <Tooltip title="Clear Conversation">

        <IconButton
            className="clear-chat-btn"
            onClick={handleClearChat}
        >

            <DeleteSweepIcon />

        </IconButton>

    </Tooltip>

</div>

      

    <div className="quick-actions">

  <Typography className="section-title">
    AI Quick Actions
  </Typography>

  <div className="quick-chip-container">

    {suggestedQuestions.map((item, index) => (

      <button
        key={index}
        className="quick-chip"
        onClick={() => handleAsk(item.question)}
      >

        <span className="chip-icon">
          {item.icon}
        </span>

        <span className="chip-text">
          {item.title}
        </span>

      </button>

    ))}

  </div>

</div>

    {/* Conversation */}

    <div className="conversation-container">

      <div className="conversation-header">

  <div className="conversation-title">

    <Typography className="conversation-heading">

      💬 Conversation

    </Typography>

    <Typography className="conversation-subtitle">

      AI Workforce Assistant

    </Typography>

  </div>

  <div className="conversation-status">

    <span className="status-indicator"></span>

    <Typography className="status-label">

      Ready

    </Typography>

  </div>

</div>

      <div className="conversation-body">

        <ChatHistory messages={messages} />

        {loading && <TypingIndicator />}

        <div ref={chatEndRef}></div>

      </div>

    </div>


    {/* Input */}

    <div className="input-area">

      <ChatInput

        value={question}

        onChange={(e) => setQuestion(e.target.value)}

        onSend={handleAsk}

        loading={loading}

      />

    </div>

  </div>
);
}


export default AIAssistant;
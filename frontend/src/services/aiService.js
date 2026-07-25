import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const askAI = async (question) => {
  const response = await API.post("/ask-ai", {
    question,
  });

  return response.data;
};
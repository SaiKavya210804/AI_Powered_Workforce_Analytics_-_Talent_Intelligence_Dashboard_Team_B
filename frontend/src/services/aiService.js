import API from "./api";

export const askAI = async (question) => {
  const response = await API.post("/ask-ai", {
    question,
  });

  return response.data;
};
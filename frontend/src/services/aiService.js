import api from "./api";


export const askAI = async (question) => {
    const response = await api.post("/ask-ai", {
        question,
    });

    return response.data;
};
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;

if (API_KEY && API_KEY !== 'your_api_key_here') {
  genAI = new GoogleGenerativeAI(API_KEY);
}

const SYSTEM_INSTRUCTION = `You are the ElectraGuide AI Assistant, an intelligent, neutral, and helpful guide for elections in India. 
Your goal is to educate users on voter registration, eligibility, EVMs, and polling processes. 
- Always remain non-partisan and neutral. Do not express political opinions or endorse candidates.
- Provide clear, concise, and step-by-step guidance.
- If asked about something unrelated to elections, politely steer the conversation back to election topics.
- When you detect Hindi, reply in Hindi. When you detect English, reply in English.`;

// We use an object to maintain separate chat sessions if needed, but a single instance works for demo.
let chatSession = null;

export const generateChatResponse = async (message, history = []) => {
  if (!genAI) {
    return "Error: Gemini API Key is missing or invalid. Please check your .env file.";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    if (!chatSession) {
      let formattedHistory = history.map(msg => ({
        role: msg.type === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }));

      // Gemini requires the first message in history to be from the 'user'.
      // If the UI starts with a bot greeting, we must drop it from history.
      while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
        formattedHistory.shift();
      }

      chatSession = model.startChat({
        history: formattedHistory,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });
    }

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

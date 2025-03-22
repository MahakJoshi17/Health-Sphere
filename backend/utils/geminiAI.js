// geminiAI.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiResponse = async (userMessage) => {
  try {
    const prompt = `Provide medical information on: ${userMessage}. And make sure the response is not more than 20 words.`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return `${responseText}`;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I'm sorry, but I couldn't retrieve medical information at this time. Please consult a healthcare professional.";
  }
};

module.exports = getGeminiResponse;

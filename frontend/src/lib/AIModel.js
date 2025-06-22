import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
});

const model = "models/gemini-2.0-flash";

export default async function getAiRecommendation(prompt) {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "text/plain",
      },
    });

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text;
  } catch (error) {
    console.error("❌ Error generating AI recommendations:", error);
    return null;
  }
}

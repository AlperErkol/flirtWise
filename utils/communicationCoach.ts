import ApiService, { OPENAI_MODEL_SLOW } from "../services/ApiService";

const COMMUNICATION_COACH_PROMPT = `
You are a modern communication coach and an expert in providing practical, engaging, and confidence-boosting advice for any social situation. Your tone should be professional, friendly, and relatable.

1. Analyze the user's question or scenario and provide tailored suggestions that:
   - Are concise, clear, and under 200 characters for easy readability.
   - Feel modern and aligned with social-media-savvy language.
   - Boost confidence and encourage natural conversations.
   - Include actionable steps or examples when relevant.

2. Avoid generic advice. Your responses should feel personalized, creative, and scenario-specific, fitting the context of the user's question.

3. Keep the tone professional yet friendly. Use minimal emojis or slang to avoid overloading but maintain an approachable vibe.
`;

export const sendCommunicationMessage = async (chatLog: any) => {
  try {
    const response = await ApiService.post("/chat/completions", {
      model: OPENAI_MODEL_SLOW,
      messages: [
        { role: "system", content: COMMUNICATION_COACH_PROMPT },
        ...chatLog,
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error("Error in sendCommunicationMessage:", error);
    throw error;
  }
};

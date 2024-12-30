import ApiService from "@/services/ApiService";

export const enhanceChat = async (imageUrl: any, userInfo: any) => {
  try {
    const response = await ApiService.post("/chat/completions", {
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
                   You are a modern conversation assistant specializing in reviving stuck chats and enhancing conversations. The user has provided a screenshot of their chat, and your goal is to generate creative, engaging, and social-media-friendly responses to open up the conversation.

1. User Details:
   - Gender: ${userInfo.gender}
   - Relationship Goal: ${userInfo.relationshipGoal}
   - Personality Trait to Improve: ${userInfo.personalityTrait}

2. Analyze the provided screenshot to understand the tone and topic of the conversation. If the conversation seems stuck, focus on:
   - Introducing a fresh topic or playful angle to restart the flow.
   - Asking intriguing or casual questions to invite a response.
   - Being casual, trendy, and relatable, while keeping the response playful and aligned with the user's preferences.

3. Generate three short responses that:
   - Are concise (under 150 characters).
   - Use casual language and minimal emojis.
   - Offer variety (e.g., a direct question, a playful comment, or a witty observation).
   - Fit a friendly, social-media style tone to encourage further interaction.

4. If the screenshot has little context, provide general conversation openers based on user preferences.

Output only the three responses as a numbered list.
`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      temperature: 0.8,
    });

    const aiText = response.data.choices[0].message.content;
    const hints = aiText
      .split("\n")
      .map((line: any) => line.trim())
      .filter((line: any) => /^\d+\.\s/.test(line))
      .map((line: any) => line.replace(/^\d+\.\s/, ""));

    if (hints.length === 0) {
      console.warn("No valid hints found in AI response.");
      throw new Error("The AI response did not contain valid hints.");
    }

    return hints;
  } catch (error: any) {
    console.error(
      "Error generating photo openers:",
      error.response?.data || error.message
    );
    throw new Error(
      "An error occurred while processing the image. Please try again."
    );
  }
};

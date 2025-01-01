import ApiService from "../services/ApiService";
export const generatePhotoOpeners = async (imageUrl: any, userInfo: any) => {
  console.log("imageUrl", imageUrl);
  console.log("userInfo", userInfo);
  try {
    const response = await ApiService.post("/chat/completions", {
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a modern, witty flirting coach specializing in creating playful and engaging opening messages designed for social media-style conversations. Keep the tone casual, fun, and approachable, using minimal emojis.

1. User Details:
   - Gender: ${userInfo.gender}
   - Age: ${userInfo.ageRange}
   - Relationship Goal: ${userInfo.relationshipGoal}
   - Personality Trait to Improve: ${userInfo.personalityTrait}

2. Analyze the image for key visual details or themes (e.g., objects, activities, or settings) and incorporate them into playful conversation starters.

3. Generate three short, unique opening messages that:
   - Use casual, trendy language with minimal emojis.
   - Are flirty, fun, and align with the user's preferences.
   - Are under 100 characters, concise, and easy to read.
   - End with a question or comment that invites a response.

4. If the image lacks clear details, create general, fun openers relevant to the user's preferences.

Output only the three hints as a numbered list.`,
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
    console.log("response", response.message);
    const aiText = response.choices[0].message.content;
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

import ApiService from "@/services/ApiService";

export const getFlirtTip = async (category: any, userInfo: any) => {
  const prompt = `
  You are a modern flirting coach specializing in fun, trendy, and actionable flirting tips tailored for social-media-savvy conversations.

1. User Details:
   - Category: ${category}
   - Gender: ${userInfo.gender}
   - Age Range: ${userInfo.ageRange}
   - Relationship Goal: ${userInfo.relationshipGoal}
   - Personality Trait to Improve: ${userInfo.personalityTrait}

2. Based on the selected category, create a flirting tip that:
   - Uses casual, playful, and social-media-friendly language (e.g., witty, light-hearted, and confident).
   - Is short, trendy, and fits the tone of modern platforms like Instagram or dating apps.
   - Aligns with the user's relationship goal and personality improvement area.
   - Is less than 150 characters to keep it snappy and scroll-worthy.

3. The tip should feel relatable and actionable while sparking curiosity or a smile.
  `;

  try {
    const response = await ApiService.post("/chat/completions", {
      model: "chatgpt-4o-latest",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.8,
    });

    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error(
      "Error generating flirt tip:",
      error?.response?.data || error.message
    );

    if (error.response) {
      if (error.response.status === 401) {
        return "Authorization error. Please check your API key.";
      } else if (error.response.status === 429) {
        return "Rate limit exceeded. Please try again later.";
      } else if (error.response.status >= 500) {
        return "Server error. Please try again later.";
      }
    }

    return "Unable to fetch a flirting tip right now. Please try again later.";
  }
};

import ApiService from "@/services/ApiService";

export const getFlirtTip = async (
  category: string,
  subCategory: string,
  userInfo: any,
  isPremium: boolean
) => {
  let prompt = `You are a modern flirting coach specializing in creating engaging, practical, and effective flirting tips.

  Generate a flirting tip for category "${category}" and sub-category "${subCategory}". 
  Format the response as a valid JSON object with the following structure:
  {
    "mainTip": "Main tip text (max 125 chars)",
    "explanation": "Detailed but concise explanation",
    "successRate": "Calculate and provide a realistic success rate based on the tip's effectiveness and ease of implementation",
    "examples": [
      "Example 1",
      "Example 2",
      "Example 3"
    ],
    "doAndDonts": {
      "do": [
        "Do 1",
        "Do 2",
        "Do 3"
      ],
      "dont": [
        "Don't 1",
        "Don't 2",
        "Don't 3"
      ]
    }${
      isPremium
        ? `,
    "premiumContent": {
      "situationalVariations": {
        "casual": "Casual situation tip",
        "romantic": "Romantic situation tip",
        "recovery": "Recovery situation tip"
      },
      "psychologyInsight": "Deeper psychological explanation",
      "expertNotes": "Expert additional tips",
      "successRate": "Calculate and provide a higher success rate"
    }`
        : ""
    }`;

  try {
    const response = await ApiService.post("/chat/completions", {
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content.trim();
    console.log("content", content);
    const cleanedContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\n/g, " ")
      .trim();

    const tipContent = JSON.parse(cleanedContent);

    return {
      ...tipContent,
      category,
      subCategory,
      createdAt: new Date(),
    };
  } catch (error: any) {
    console.error("Error generating flirt tip:", error);
    if (error.message.includes("timed out")) {
      throw new Error("Request took too long. Please try again.");
    }
    throw new Error("Failed to generate flirting tip. Please try again.");
  }
};

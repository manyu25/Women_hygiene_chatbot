const API_KEY = process.env.GEMINI_API_KEY; // Replace with your actual API key
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const constructPrompt = (userQuery) => {
  return `
      You are a virtual women's health assistant providing information to users in India. You should respond to the following question about women's health with empathy, medical accuracy, and cultural sensitivity.
  
      User Question: ${userQuery}
  
      Please structure your response as follows:
      1. Start with empathy – acknowledge the user's concern
      2. Explain the context – possible causes and information
      3. Suggest safe, general advice (hygiene tips, routine habits)
      4. Only recommend seeing a doctor for serious or uncertain cases
  
      Important guidelines:
      - Use simple, culturally appropriate language for an Indian audience
      - Keep responses between 150-250 words
      - Provide medically informative, responsible, and educational content
      - Do NOT provide specific medical diagnoses or prescriptions
      - Do NOT give false assurances
      - Do NOT overuse the "consult a doctor" advice — use it only when necessary
      - No emojis, jokes, or slang
      - Be respectful and supportive
  
      Focus your response on menstrual health, reproductive health, hormonal balance, hygiene practices, or emotional well-being related to women's health.
    `;
};

export const getGeminiResponse = async (userQuery) => {
  try {
    const prompt = constructPrompt(userQuery);

    console.log("Sending request to Gemini API...");

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      }),
    });

    console.log("API Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", JSON.stringify(errorData, null, 2));
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response data structure:", Object.keys(data));

    // Check if the response has the expected structure
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Unexpected response format from API");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

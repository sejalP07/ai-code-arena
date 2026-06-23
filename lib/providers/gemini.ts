export class GeminiProvider {
  async generate(prompt: string) {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",

            max_tokens: 1000,

            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Gemini API Error:", data);
        return "Gemini unavailable";
      }

      return (
        data?.choices?.[0]?.message?.content ??
        "No response"
      );
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Gemini unavailable";
    }
  }
}
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export class ClaudeProvider {
  async generate(prompt: string) {
    try {
      const completion =
        await client.chat.completions.create({
          model: "anthropic/claude-sonnet-4",

          max_tokens: 1000,

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return (
        completion.choices[0].message.content ??
        "No response"
      );
    } catch (error) {
      console.error("Claude Error:", error);
      return "Claude unavailable";
    }
  }
}
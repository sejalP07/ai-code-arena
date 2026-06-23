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
    model: "anthropic/claude-3-haiku",
    max_tokens: 300,
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
    } catch (error: any) {
  console.error(
    "Claude Error FULL:",
    JSON.stringify(error, null, 2)
  );

  return "Claude unavailable";
}
  }
}
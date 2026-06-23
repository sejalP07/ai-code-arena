import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

type JudgeResult = {
  gpt: number;
  gemini: number;
  claude: number;
  winner: string;
  reason: string;
  recommendation: string;
};

export async function judgeResponses(
  prompt: string,
  gpt: string,
  gemini: string,
  claude: string
): Promise<JudgeResult> {
  const judgePrompt = `
You are a Senior Software Engineer and Technical Interviewer.

Compare the following AI-generated solutions.

Original Prompt:
${prompt}

====================
GPT Response
====================
${gpt}

====================
Gemini Response
====================
${gemini}

====================
Claude Response
====================
${claude}

Evaluate each response on:

1. Correctness
2. Readability
3. Performance
4. Best Practices
5. Completeness

Give each model a score from 0-100.

Then determine the winner.

Also explain:
- Why the winner is better
- Which response should be used

IMPORTANT:
Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use \`\`\`.
Do NOT add any text outside JSON.

Example:

{
  "gpt": 92,
  "gemini": 88,
  "claude": 95,
  "winner": "claude",
  "reason": "Claude provided the most complete and readable solution with strong explanations and best practices.",
  "recommendation": "Use Claude's solution for production. GPT is also acceptable."
}
`;

  try {
    const result = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: judgePrompt,
        },
      ],
      temperature: 0,
      max_tokens: 500,
    });

    const content =
      result.choices[0].message.content ?? "{}";

    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return {
      gpt: Number(parsed.gpt ?? 0),
      gemini: Number(parsed.gemini ?? 0),
      claude: Number(parsed.claude ?? 0),

      winner: String(
        parsed.winner ?? "unknown"
      ),

      reason: String(
        parsed.reason ??
          "No reason provided"
      ),

      recommendation: String(
        parsed.recommendation ??
          "No recommendation provided"
      ),
    };
  } catch (error) {
    console.error(
      "Judge Error:",
      error
    );

    return {
      gpt: 0,
      gemini: 0,
      claude: 0,
      winner: "unknown",
      reason: "Judge failed",
      recommendation:
        "Unable to evaluate responses",
    };
  }
}
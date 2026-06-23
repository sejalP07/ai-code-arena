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
  try {
    const safeGPT =
      !gpt ||
      gpt.trim() === "" ||
      gpt.toLowerCase().includes("unavailable")
        ? "No valid response"
        : gpt;

    const safeGemini =
      !gemini ||
      gemini.trim() === "" ||
      gemini.toLowerCase().includes("unavailable")
        ? "No valid response"
        : gemini;

    const safeClaude =
      !claude ||
      claude.trim() === "" ||
      claude.toLowerCase().includes("unavailable")
        ? "No valid response"
        : claude;

    const judgePrompt = `
You are a Senior Software Engineer and Technical Interviewer.

Compare the following AI-generated solutions.

Original Prompt:
${prompt}

====================
GPT Response
====================
${safeGPT}

====================
Gemini Response
====================
${safeGemini}

====================
Claude Response
====================
${safeClaude}

Evaluate each response on:

1. Correctness
2. Readability
3. Performance
4. Best Practices
5. Completeness

Give each model a score from 0-100.

IMPORTANT:

- If a response is missing, unavailable, empty,
  or says "No valid response", score it 0.
- A model with score 0 CANNOT be the winner.
- Winner must be the highest scoring valid model.

Return ONLY valid JSON.

Example:

{
  "gpt": 95,
  "gemini": 88,
  "claude": 0,
  "winner": "gpt",
  "reason": "GPT provided the most complete and optimized solution.",
  "recommendation": "Use GPT's solution."
}
`;

    const result =
      await client.chat.completions.create({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: judgePrompt,
          },
        ],
        temperature: 0,
        max_tokens: 1000,
      });

    const content =
      result.choices[0].message.content ??
      "{}";

    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(cleaned);

    let gptScore = Number(
      parsed.gpt ?? 0
    );

    let geminiScore = Number(
      parsed.gemini ?? 0
    );

    let claudeScore = Number(
      parsed.claude ?? 0
    );

    if (
      safeGPT ===
      "No valid response"
    ) {
      gptScore = 0;
    }

    if (
      safeGemini ===
      "No valid response"
    ) {
      geminiScore = 0;
    }

    if (
      safeClaude ===
      "No valid response"
    ) {
      claudeScore = 0;
    }

    const scores = [
      {
        name: "gpt",
        score: gptScore,
      },
      {
        name: "gemini",
        score: geminiScore,
      },
      {
        name: "claude",
        score: claudeScore,
      },
    ];

    scores.sort(
      (a, b) =>
        b.score - a.score
    );

    const winner =
      scores[0].score > 0
        ? scores[0].name
        : "none";

    return {
      gpt: gptScore,
      gemini: geminiScore,
      claude: claudeScore,

      winner,

      reason:
        parsed.reason ??
        `${winner.toUpperCase()} produced the strongest response.`,

      recommendation:
        parsed.recommendation ??
        `Use ${winner.toUpperCase()} for this task.`,
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
      winner: "none",
      reason:
        "Judge failed to evaluate responses.",
      recommendation:
        "Try again later.",
    };
  }
}
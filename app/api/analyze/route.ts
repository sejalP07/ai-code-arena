import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt, gpt, gemini, claude } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer.

Compare AI-generated coding solutions.

Return ONLY valid JSON:

{
  "bestModel":"",
  "reason":"",
  "timeComplexity":"",
  "spaceComplexity":"",
  "recommendation":""
}
`,
        },
        {
          role: "user",
          content: `
PROMPT:
${prompt}

GPT:
${gpt}

GEMINI:
${gemini}

CLAUDE:
${claude}
`,
        },
      ],
      temperature: 0,
    });

    const result =
      completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      analysis: JSON.parse(result || "{}"),
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
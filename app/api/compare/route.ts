import { NextResponse } from "next/server";
import { OpenAIProvider } from "@/lib/providers/openai";
import { GeminiProvider } from "@/lib/providers/gemini";
import { ClaudeProvider } from "@/lib/providers/claude";
import { judgeResponses } from "@/lib/judge";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const openai = new OpenAIProvider();
    const gemini = new GeminiProvider();
    const claude = new ClaudeProvider();

    const gptPromise = openai.generate(prompt);

    const geminiPromise = gemini
      .generate(prompt)
      .catch((err) => {
        console.error("Gemini Error:", err);
        return "Gemini unavailable";
      });

    const claudePromise = claude
      .generate(prompt)
      .catch((err) => {
        console.error("Claude Error:", err);
        return "Claude unavailable";
      });

    const [
      gptResult,
      geminiResult,
      claudeResult,
    ] = await Promise.all([
      gptPromise,
      geminiPromise,
      claudePromise,
    ]);

    const judgeResult =
      await judgeResponses(
        prompt,
        gptResult,
        geminiResult,
        claudeResult
      );

    const user = await prisma.user.upsert({
      where: {
        email: session.user.email,
      },
      update: {},
      create: {
        email: session.user.email,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
      },
    });

    const comparison =
      await prisma.comparison.create({
        data: {
          prompt,
          language: "java",

          winner: judgeResult.winner,

          gptScore: judgeResult.gpt,
          geminiScore: judgeResult.gemini,
          claudeScore: judgeResult.claude,

          reason: judgeResult.reason,
          recommendation:
            judgeResult.recommendation,

          userId: user.id,
        },
      });

    await prisma.modelResponse.createMany({
      data: [
        {
          provider: "GPT",
          model: "gpt-4o-mini",
          output: gptResult,
          comparisonId: comparison.id,
        },
        {
          provider: "Gemini",
          model: "gemini-2.5-flash",
          output: geminiResult,
          comparisonId: comparison.id,
        },
        {
          provider: "Claude",
          model: "claude-sonnet-4",
          output: claudeResult,
          comparisonId: comparison.id,
        },
      ],
    });

    return NextResponse.json({
      success: true,

      winner: judgeResult.winner,

      scores: {
        gpt: judgeResult.gpt,
        gemini: judgeResult.gemini,
        claude: judgeResult.claude,
      },

      reason: judgeResult.reason,

      recommendation:
        judgeResult.recommendation,

      responses: {
        gpt: gptResult,
        gemini: geminiResult,
        claude: claudeResult,
      },
    });
  } catch (error: any) {
    console.error(
      "COMPARE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Unknown error",
      },
      { status: 500 }
    );
  }
}
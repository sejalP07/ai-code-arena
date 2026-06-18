import { NextResponse } from "next/server";
import { OpenAIProvider } from "@/lib/providers/openai";
import { GeminiProvider } from "@/lib/providers/gemini";
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

    // GPT
    const gptPromise = openai.generate(prompt);

    // Gemini (don't fail entire request if Gemini is down)
    const geminiPromise = gemini
      .generate(prompt)
      .catch((err) => {
        console.error("Gemini Error:", err);
        return "Gemini unavailable";
      });

    const [gptResult, geminiResult] = await Promise.all([
      gptPromise,
      geminiPromise,
    ]);

    // Create or update user
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

    // Save comparison
    const comparison = await prisma.comparison.create({
      data: {
        prompt,
        language: "java",
        userId: user.id,
      },
    });

    // Save model responses
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
          model: "gemini-2.0-flash",
          output: geminiResult,
          comparisonId: comparison.id,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      responses: {
        gpt: gptResult,
        gemini: geminiResult,
      },
    });
  } catch (error: any) {
    console.error("COMPARE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
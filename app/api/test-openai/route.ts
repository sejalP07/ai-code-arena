import { NextResponse } from "next/server";
import { OpenAIProvider } from "@/lib/providers/openai";

export async function GET() {
  try {
    const provider = new OpenAIProvider();

    const result = await provider.generate(
      "Write hello world in Java"
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message,
        error,
      },
      { status: 500 }
    );
  }
}
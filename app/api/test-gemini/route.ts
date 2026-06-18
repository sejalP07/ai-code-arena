import { NextResponse } from "next/server";
import { GeminiProvider } from "@/lib/providers/gemini";

export async function GET() {
  const provider = new GeminiProvider();

  const result = await provider.generate(
    "Write hello world in Java"
  );

  return NextResponse.json({
    success: true,
    result,
  });
}
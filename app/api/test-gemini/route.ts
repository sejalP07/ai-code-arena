import { NextResponse } from "next/server";
import { GeminiProvider } from "@/lib/providers/gemini";

export async function GET() {
  const gemini = new GeminiProvider();

  const result = await gemini.generate("Say hello");

  return NextResponse.json({
    result,
  });
}
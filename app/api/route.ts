import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { handlers } from "@/auth";

export const { POST } = handlers;
export async function GET() {
  const count = await prisma.user.count();

  return NextResponse.json({
    users: count,
  });
}
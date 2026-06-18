import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return Response.json({
      success: true,
      users,
    });
  } catch (e: any) {
    return Response.json({
      success: false,
      error: e.message,
      stack: String(e),
    });
  }
}


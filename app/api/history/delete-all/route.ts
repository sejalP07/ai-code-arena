import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function DELETE() {
  try {
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

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
      });
    }

    const comparisons =
      await prisma.comparison.findMany({
        where: {
          userId: user.id,
        },
      });

    const ids = comparisons.map(
      (c) => c.id
    );

    await prisma.modelResponse.deleteMany({
      where: {
        comparisonId: {
          in: ids,
        },
      },
    });

    await prisma.comparison.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
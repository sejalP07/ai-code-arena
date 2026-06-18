import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className="p-8">
        Please login first
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      comparisons: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        History
      </h1>

      <div className="space-y-4">
        {user?.comparisons.map((comparison) => (
          <div
            key={comparison.id}
            className="border rounded-lg p-4"
          >
            <p className="font-semibold">
              {comparison.prompt}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(
                comparison.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
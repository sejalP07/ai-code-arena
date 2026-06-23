import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50">

      <div className="max-w-3xl mx-auto text-center px-6">

        <h1 className="text-6xl font-bold mb-6">
          AI Code Arena
        </h1>

        <p className="text-xl text-zinc-600 mb-8">
          Compare GPT, Gemini and Claude side-by-side.
          Get AI-powered scoring, winner analysis,
          recommendations and history tracking.
        </p>

        {session ? (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-black text-white rounded-xl"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            href="/api/auth/signin"
            className="px-6 py-3 bg-black text-white rounded-xl"
          >
            Sign In
          </Link>
        )}

      </div>

    </main>
  );
}
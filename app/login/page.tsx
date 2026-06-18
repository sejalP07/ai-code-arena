"use client";

import { signIn } from "next-auth/react";
import { GitHub, Chrome } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            AI Code Arena
          </h1>

          <p className="text-muted-foreground mt-2">
            Compare AI models side-by-side
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border rounded-lg px-4 py-3 hover:bg-muted transition"
          >
            <Chrome size={18} />
            Continue with Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border rounded-lg px-4 py-3 hover:bg-muted transition"
          >
            <GitHub size={18} />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
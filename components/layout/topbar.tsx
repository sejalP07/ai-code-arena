"use client";

import { signOut, useSession } from "next-auth/react";

export function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b px-6 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
          {session?.user?.name?.[0] ?? "U"}
        </div>

        <span className="font-medium">
          {session?.user?.name}
        </span>

        <button
          onClick={() => signOut()}
          className="border px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
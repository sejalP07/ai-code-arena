"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold">
          AI Code Arena
        </h1>

        <p className="text-xs text-gray-500">
          Compare GPT, Gemini & Claude
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <Bell size={18} />
        </button>

        {/* Settings */}
        <Link
          href="/settings"
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <Settings size={18} />
        </Link>

        {/* User */}
        <div className="flex items-center gap-3 border rounded-xl px-3 py-2">

          <img
            src={
              session?.user?.image ??
              "/avatar.png"
            }
            alt="avatar"
            className="w-9 h-9 rounded-full"
          />

          <div className="hidden md:block">
            <p className="font-medium text-sm">
              {session?.user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {session?.user?.email}
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className="
          flex items-center gap-2
          bg-red-500
          hover:bg-red-600
          text-white
          px-4 py-2
          rounded-xl
          transition
        "
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </header>
  );
}
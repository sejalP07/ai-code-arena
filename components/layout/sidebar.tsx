import Link from "next/link";
import {
  LayoutDashboard,
  History,
  Trophy,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">
      
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">
          AI Code Arena
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          AI Coding Benchmark
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/history"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"
        >
          <History size={18} />
          <span>History</span>
        </Link>

        <Link
          href="/leaderboard"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"
        >
          <Trophy size={18} />
          <span>Leaderboard</span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>

      </nav>

      <div className="p-4 border-t">
        <div className="rounded-xl bg-gray-100 p-3">
          <p className="text-sm font-medium">
            AI Code Arena
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Compare GPT, Gemini & Claude
          </p>
        </div>
      </div>

    </aside>
  );
}
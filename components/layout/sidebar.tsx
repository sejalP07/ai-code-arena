"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  Settings,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">
          AI Code Arena
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          AI Coding Benchmark
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  active
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="rounded-xl bg-gray-100 p-3">
          <p className="text-sm font-medium">
            AI Code Arena
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Compare GPT, Gemini &
            Claude
          </p>
        </div>
      </div>

    </aside>
  );
}
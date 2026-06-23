"use client";

import { signOut } from "next-auth/react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your AI Code Arena preferences.
        </p>
      </div>

      {/* Preferences */}
      <div className="border rounded-2xl p-6 bg-white">

        <h2 className="text-xl font-semibold mb-4">
          Preferences
        </h2>

        <label htmlFor="default-language" className="block mb-2">
          Default Language
        </label>

        <select
          id="default-language"
          name="defaultLanguage"
          aria-label="Default Language"
          className="border rounded-xl p-3 w-full"
        >
          <option>Python</option>
          <option>Java</option>
          <option>JavaScript</option>
          <option>C++</option>
        </select>

      </div>

      {/* Models */}
      <div className="border rounded-2xl p-6 bg-white">

        <h2 className="text-xl font-semibold mb-4">
          Enabled Models
        </h2>

        <div className="space-y-3">

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
            />
            GPT
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
            />
            Gemini
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
            />
            Claude
          </label>

        </div>

      </div>

      {/* Danger Zone */}
      <div className="border border-red-300 rounded-2xl p-6 bg-red-50">

        <h2 className="text-xl font-semibold text-red-600">
          Danger Zone
        </h2>

        <div className="mt-4 flex gap-3">

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="px-4 py-2 bg-black text-white rounded-xl"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}
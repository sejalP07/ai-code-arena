"use client";

import { useState } from "react";



export default function ComparePage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any>(null);

  async function runComparison() {
    const res = await fetch("/api/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await res.json();

    setResponse(data);
  }

  return (
    <div className="p-8 space-y-4">
      <textarea
        className="border p-2 w-full"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={runComparison}
        className="border px-4 py-2"
      >
        Compare
      </button>

      {response && (
        <pre>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
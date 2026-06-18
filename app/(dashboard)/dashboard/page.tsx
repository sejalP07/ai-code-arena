"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [responses, setResponses] = useState<{
    gpt?: string;
    gemini?: string;
    claude?: string;
  } | null>(null);

  async function handleCompare() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
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

      if (data.success) {
        setResponses({
          gpt: data.responses.gpt,
          gemini: data.responses.gemini,
          claude: "Claude integration coming soon...",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-full mx-auto">

      

      {/* Prompt */}
      <div className="border rounded-2xl p-6 shadow-sm bg-white">

        <h2 className="font-semibold mb-4">
          Enter Prompt
        </h2>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI Code Arena..."
          className="w-full h-24 resize-none border rounded-2xl p-4 focus:outline-none"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCompare}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-black text-white"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>
        
        
      </div>

      {/* Responses */}
      {responses && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

            {/* GPT */}
            <div className="border rounded-2xl p-6 shadow-sm min-h-[650px] overflow-auto bg-white">

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">
                  GPT
                </h2>

                <span className="text-xs border px-2 py-1 rounded">
                  OpenRouter
                </span>
              </div>

              <div className="prose max-w-none">
                <ReactMarkdown>
                  {responses.gpt ?? ""}
                </ReactMarkdown>
              </div>
            </div>

            {/* Gemini */}
            <div className="border rounded-2xl p-6 shadow-sm min-h-[650px] overflow-auto bg-white">

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">
                  Gemini
                </h2>

                <span className="text-xs border px-2 py-1 rounded">
                  Google
                </span>
              </div>

              <div className="prose max-w-none">
                <ReactMarkdown>
                  {responses.gemini ?? ""}
                </ReactMarkdown>
              </div>
            </div>

            {/* Claude */}
            <div className="border rounded-2xl p-6 shadow-sm min-h-[650px] overflow-auto bg-white">

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">
                  Claude
                </h2>

                <span className="text-xs border px-2 py-1 rounded">
                  Anthropic
                </span>
              </div>

              <div className="prose max-w-none">
                <ReactMarkdown>
                  {responses.claude ?? ""}
                </ReactMarkdown>
              </div>
            </div>

          </div>

          {/* Arena Analysis */}
          <div className="mt-6 border rounded-2xl p-6 shadow-sm bg-white">

            <h2 className="text-2xl font-bold mb-6">
              🏆 Arena Analysis
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  Best Model
                </h3>

                <p className="mt-2">
                  GPT
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Time Complexity
                </h3>

                <ul className="list-disc pl-5 mt-2">
                  <li>GPT: O(log n)</li>
                  <li>Gemini: O(log n)</li>
                  <li>Claude: O(log n)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Space Complexity
                </h3>

                <ul className="list-disc pl-5 mt-2">
                  <li>GPT: O(1)</li>
                  <li>Gemini: O(1)</li>
                  <li>Claude: O(1)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Recommendation
                </h3>

                <p className="mt-2">
                  GPT provides the cleanest and most production-ready solution.
                </p>
              </div>

            </div>

          </div>
        </>
      )}
    </div>
  );
}
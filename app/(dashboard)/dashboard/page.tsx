"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";

type Responses = {
  gpt?: string;
  gemini?: string;
  claude?: string;
};

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [responses, setResponses] =
    useState<Responses | null>(null);

  const [winner, setWinner] = useState("");
  const [reason, setReason] = useState("");
  const [recommendation, setRecommendation] =
    useState("");

  const [scores, setScores] = useState<{
    gpt: number;
    gemini: number;
    claude: number;
  } | null>(null);

  async function handleCompare() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(
          data.error ||
            "Comparison failed"
        );
      }

      const responseData = {
        gpt:
          data.responses?.gpt ?? "",
        gemini:
          data.responses?.gemini ??
          "",
        claude:
          data.responses?.claude ??
          "",
      };

      setResponses(responseData);

      setWinner(
        data.winner ?? ""
      );

      setReason(
        data.reason ?? ""
      );

      setRecommendation(
        data.recommendation ?? ""
      );

      setScores({
        gpt:
          data.scores?.gpt ?? 0,
        gemini:
          data.scores?.gemini ??
          0,
        claude:
          data.scores?.claude ??
          0,
      });
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-full mx-auto">

      {/* Prompt Box */}
      <div className="border rounded-3xl p-4 shadow-sm bg-white">

        <textarea
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          placeholder="Ask AI Code Arena..."
          className="w-full h-24 resize-none outline-none border-none bg-transparent"
        />

        <div className="flex justify-end mt-3">
          <button
            onClick={
              handleCompare
            }
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-black text-white flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Comparing...
              </>
            ) : (
              "Compare"
            )}
          </button>
        </div>

      </div>

      {/* Winner Section */}
      {winner && scores && (
        <div className="mt-6 border rounded-2xl p-6 bg-green-50">

          <h2 className="text-2xl font-bold">
            🏆 Winner:{" "}
            {winner.toUpperCase()}
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mt-4">

            <div className="bg-white border rounded-xl p-4">
              <p className="font-semibold">
                GPT
              </p>

              <p className="text-3xl font-bold">
                {scores.gpt}
              </p>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <p className="font-semibold">
                Gemini
              </p>

              <p className="text-3xl font-bold">
                {scores.gemini}
              </p>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <p className="font-semibold">
                Claude
              </p>

              <p className="text-3xl font-bold">
                {scores.claude}
              </p>
            </div>

          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg">
              Why This Model Won
            </h3>

            <p className="mt-2">
              {reason}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg">
              Recommendation
            </h3>

            <p className="mt-2">
              {recommendation}
            </p>
          </div>

        </div>
      )}

      {/* Responses */}
      {responses && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          {/* GPT */}
          <div className="border rounded-2xl p-6 shadow-sm min-h-[650px] overflow-auto bg-white">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">
                GPT
              </h2>

              <span className="text-xs border px-2 py-1 rounded">
                OpenAI
              </span>
            </div>

            <div className="prose max-w-none">
              <ReactMarkdown>
                {responses.gpt ??
                  ""}
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
                {responses.gemini ??
                  ""}
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
                {responses.claude ??
                  ""}
              </ReactMarkdown>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
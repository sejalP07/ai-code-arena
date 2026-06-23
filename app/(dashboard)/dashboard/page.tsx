"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Loader2,
  Trophy,
  Brain,
} from "lucide-react";

import {
  SiOpenai,
  SiGoogle,
  SiAnthropic,
} from "react-icons/si";




type Responses = {
  gpt?: string;
  gemini?: string;
  claude?: string;
};

export default function DashboardPage() {
  const markdownComponents = {
  code({
    inline,
    className,
    children,
    ...props
  }: any) {
    const match = /language-(\w+)/.exec(
      className || ""
    );

    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(
          /\n$/,
          ""
        )}
      </SyntaxHighlighter>
    ) : (
      <code
        className={className}
        {...props}
      >
        {children}
      </code>
    );
  },
};
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("Python");
  const [loading, setLoading] = useState(false);

  const [responses, setResponses] =
    useState<Responses | null>(null);
  const [copied, setCopied] = useState("");
  const [winner, setWinner] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [
    recommendation,
    setRecommendation,
  ] = useState("");

  const [scores, setScores] =
    useState<{
      gpt: number;
      gemini: number;
      claude: number;
    } | null>(null);

  async function handleCompare() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "/api/compare",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt,
            language,
          }),
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        throw new Error(
          data.error ||
            "Comparison failed"
        );
      }

      setResponses(
        data.responses
      );

      setWinner(
        data.winner ?? ""
      );

      setReason(
        data.reason ?? ""
      );

      setRecommendation(
        data.recommendation ??
          ""
      );

      setScores({
        gpt:
          data.scores?.gpt ??
          0,
        gemini:
          data.scores
            ?.gemini ?? 0,
        claude:
          data.scores
            ?.claude ?? 0,
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
  const copyToClipboard = async (
  text: string,
  model: string
) => {
  try {
    await navigator.clipboard.writeText(text);

    setCopied(model);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="max-w-full mx-auto">

    {/* Hero Section */}
    <div className="mb-6 rounded-3xl p-8 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl">

      <h1 className="text-4xl font-bold">
        🚀 AI Code Arena
      </h1>

      <p className="mt-2 text-lg opacity-90">
        Compare GPT, Gemini & Claude side by side
      </p>

      <div className="flex gap-3 mt-5">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
          GPT
        </span>

        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
          Gemini
        </span>

        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
          Claude
        </span>
      </div>

    </div>

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

        <div className="flex justify-between items-center mt-3">

          <label className="flex items-center gap-2">
            <span className="text-sm">
              Language
            </span>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
              className="border rounded-xl px-3 py-2"
            >
              <option>
                Python
              </option>

              <option>
                Java
              </option>

              <option>
                JavaScript
              </option>

              <option>
                C++
              </option>
            </select>
          </label>

          <button
            onClick={
              handleCompare
            }
            disabled={loading}
            className="px-6 py-3
rounded-xl
bg-linear-to-r
from-indigo-600
to-purple-600
text-white
font-semibold
shadow-lg
hover:scale-105
transition
flex items-center gap-2">
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
      <div className="mt-6 rounded-3xl p-8 bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-xl">
            <div className="flex items-center gap-3">
  <Trophy size={32} />
  <h2 className="text-3xl font-bold">
    Winner: {winner.toUpperCase()}
  </h2>
</div>

          <p className="text-sm text-white/80 mt-2">
            Language: {language}
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-4">

          <div className="bg-white text-black rounded-2xl p-4 shadow-lg">
  <p className="font-semibold text-gray-500">
    GPT
  </p>

  <p className="text-4xl font-bold">
    {scores.gpt}
  </p>
</div>

           <div className="bg-white text-black rounded-2xl p-4 shadow-lg">
  <p className="font-semibold text-gray-500">
    Gemini
  </p>

  <p className="text-4xl font-bold">
    {scores.gemini}
  </p>
</div> 

        <div className="bg-white text-black rounded-2xl p-4 shadow-lg">
  <p className="font-semibold text-gray-500">
    Claude
  </p>

  <p className="text-4xl font-bold">
    {scores.claude}
  </p>
</div>    

          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg">
              Why This Model Won
            </h3>

            <p className="mt-2 text-white">
              {reason}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg">
              Recommendation
            </h3>

            <p className="mt-2 text-white">
  {recommendation}
</p>
          </div>

        </div>
      )}

      {/* Responses */}
      {responses && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          {/* GPT */}
         <div className="border rounded-2xl p-6 bg-white overflow-auto">
          <div className="flex justify-between items-center mb-4">

  <div className="flex items-center gap-2">
    <SiOpenai size={22} />

    <h2 className="font-bold text-xl">
      GPT
    </h2>
  </div>

  <button
    onClick={() =>
      copyToClipboard(
        responses.gpt ?? "",
        "gpt"
      )
    }
    className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
  >
    {copied === "gpt"
      ? "Copied!"
      : "Copy"}
  </button>

</div>
            <div className="prose max-w-none">
              <ReactMarkdown
  components={
    markdownComponents
  }
>
  {responses.gpt ?? ""}
</ReactMarkdown>
            </div>

          </div>

          {/* Gemini */}
          <div className="border rounded-2xl p-6 bg-white overflow-auto">

           <div className="flex justify-between items-center mb-4">

  <div className="flex items-center gap-2">
    <SiGoogle size={22} />

    <h2 className="font-bold text-xl">
      Gemini
    </h2>
  </div>

  <button
    onClick={() =>
      copyToClipboard(
        responses.gemini ?? "",
        "gemini"
      )
    }
    className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
  >
    {copied === "gemini"
      ? "Copied!"
      : "Copy"}
  </button>

</div>

            <div className="prose max-w-none">
              <ReactMarkdown
  components={
    markdownComponents
  }
>
  {responses.gemini ?? ""}
</ReactMarkdown>
            </div>

          </div>

          {/* Claude */}
          <div className="border rounded-2xl p-6 bg-white overflow-auto">

            <div className="flex justify-between items-center mb-4">

  <div className="flex items-center gap-2">
    <Brain size={22} />

    <h2 className="font-bold text-xl">
      Claude
    </h2>
  </div>

  <button
    onClick={() =>
      copyToClipboard(
        responses.claude ?? "",
        "claude"
      )
    }
    className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
  >
    {copied === "claude"
      ? "Copied!"
      : "Copy"}
  </button>

</div>
            <div className="prose max-w-none">
              <ReactMarkdown
  components={
    markdownComponents
  }
>
  {responses.claude ?? ""}
</ReactMarkdown>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
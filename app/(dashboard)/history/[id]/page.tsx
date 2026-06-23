import ReactMarkdown from "react-markdown";

const markdownComponents = {};

async function getComparison(
  id: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/history/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const data =
    await getComparison(id);

  const comparison =
    data.comparison;

  if (!comparison) {
    return (
      <div className="p-8">
        Comparison not found.
      </div>
    );
  }

  const gpt =
    comparison.responses.find(
      (r: any) =>
        r.provider === "GPT"
    );

  const gemini =
    comparison.responses.find(
      (r: any) =>
        r.provider ===
        "Gemini"
    );

  const claude =
    comparison.responses.find(
      (r: any) =>
        r.provider ===
        "Claude"
    );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Comparison Details
      </h1>

      <div className="border rounded-2xl p-6 bg-white">

        <h2 className="font-bold text-xl">
          Prompt
        </h2>

        <p className="mt-2">
          {comparison.prompt}
        </p>

      </div>

      <div className="border rounded-2xl p-6 bg-green-50">

        <h2 className="text-2xl font-bold">
          🏆 Winner:
          {" "}
          {comparison.winner}
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-4">

          <div className="bg-white p-4 rounded-xl border">
            <p>GPT</p>
            <p className="text-3xl font-bold">
              {comparison.gptScore}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <p>Gemini</p>
            <p className="text-3xl font-bold">
              {comparison.geminiScore}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <p>Claude</p>
            <p className="text-3xl font-bold">
              {comparison.claudeScore}
            </p>
          </div>

        </div>

        <div className="mt-6">

          <h3 className="font-semibold">
            Why This Model Won
          </h3>

          <p className="mt-2">
            {comparison.reason}
          </p>

        </div>

        <div className="mt-6">

          <h3 className="font-semibold">
            Recommendation
          </h3>

          <p className="mt-2">
            {comparison.recommendation}
          </p>

        </div>

      </div>

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="border rounded-2xl p-6 bg-white">

          <h2 className="font-bold text-xl mb-4">
            GPT
          </h2>

          <ReactMarkdown components={markdownComponents}>
            {gpt?.output ?? ""}
          </ReactMarkdown>

        </div>

        <div className="border rounded-2xl p-6 bg-white">

          <h2 className="font-bold text-xl mb-4">
            Gemini
          </h2>

          <ReactMarkdown components={markdownComponents}>
            {gemini?.output ?? ""}
          </ReactMarkdown>

        </div>

        <div className="border rounded-2xl p-6 bg-white">

          <h2 className="font-bold text-xl mb-4">
            Claude
          </h2>

          <ReactMarkdown components={markdownComponents}>
            {claude?.output ?? ""}
          </ReactMarkdown>

        </div>

      </div>

    </div>
  );
}
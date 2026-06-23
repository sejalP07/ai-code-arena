"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((res) =>
        setData(res.comparisons || [])
      );
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        History
      </h1>

      <table className="w-full border">

        <thead>
          <tr className="border-b">
            <th>Prompt</th>
            <th>Winner</th>
            <th>GPT</th>
            <th>Gemini</th>
            <th>Claude</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item: any) => (
            <tr
              key={item.id}
              className="border-b"
            >
              <td className="p-3">
                {item.prompt}
              </td>

              <td>
                {item.winner}
              </td>

              <td>
                {item.gptScore}
              </td>

              <td>
                {item.geminiScore}
              </td>

              <td>
                {item.claudeScore}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
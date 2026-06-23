"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Comparison = {
  id: string;
  prompt: string;
  language: string;
  winner: string;
  gptScore: number;
  geminiScore: number;
  claudeScore: number;
  createdAt: string;
};

export default function HistoryPage() {
  const [data, setData] = useState<
    Comparison[]
  >([]);

  const loadHistory = async () => {
    const res = await fetch(
      "/api/history"
    );

    const json =
      await res.json();

    setData(
      json.comparisons || []
    );
  };

  useEffect(() => {
    loadHistory();
  }, []);

  async function deleteItem(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this comparison?"
      );

    if (!confirmed) return;

    const res = await fetch(
      `/api/history/${id}`,
      {
        method: "DELETE",
      }
    );

    const json =
      await res.json();

    if (json.success) {
      setData((prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
      );
    }
  }

  async function deleteAll() {
    const confirmed =
      window.confirm(
        "Delete ALL history?"
      );

    if (!confirmed) return;

    const res = await fetch(
      "/api/history/delete-all",
      {
        method: "DELETE",
      }
    );

    const json =
      await res.json();

    if (json.success) {
      setData([]);
    }
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            History
          </h1>

          <p className="text-gray-500 mt-1">
            {data.length} Comparisons
          </p>
        </div>

        {data.length > 0 && (
          <button
            onClick={deleteAll}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            Delete All
          </button>
        )}

      </div>

      {data.length === 0 && (
        <div className="border rounded-2xl p-10 bg-white text-center">
          <h2 className="text-xl font-semibold">
            No Comparisons Found
          </h2>

          <p className="text-gray-500 mt-2">
            Run your first AI comparison from the dashboard.
          </p>
        </div>
      )}

      {data.length > 0 && (
        <div className="overflow-x-auto border rounded-2xl bg-white shadow-sm">

          <table className="w-full">

            <thead>
              <tr className="border-b bg-gray-50">

                <th className="p-4 text-left">
                  Prompt
                </th>

                <th className="p-4 text-center">
                  Language
                </th>

                <th className="p-4 text-center">
                  Winner
                </th>

                <th className="p-4 text-center">
                  Date
                </th>

                <th className="p-4 text-center">
                  GPT
                </th>

                <th className="p-4 text-center">
                  Gemini
                </th>

                <th className="p-4 text-center">
                  Claude
                </th>

                <th className="p-4 text-center">
                  Details
                </th>

                <th className="p-4 text-center">
                  Delete
                </th>

              </tr>
            </thead>

            <tbody>

              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 max-w-md">
                    {item.prompt}
                  </td>

                  <td className="text-center">
                    {item.language}
                  </td>

                  <td className="text-center">

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      {item.winner}
                    </span>

                  </td>

                  <td className="text-center text-sm">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </td>

                  <td className="text-center font-medium">
                    {item.gptScore}
                  </td>

                  <td className="text-center font-medium">
                    {item.geminiScore}
                  </td>

                  <td className="text-center font-medium">
                    {item.claudeScore}
                  </td>

                  <td className="text-center">

                    <Link
                      href={`/history/${item.id}`}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                      View
                    </Link>

                  </td>

                  <td className="text-center">

                    <button
                      onClick={() =>
                        deleteItem(
                          item.id
                        )
                      }
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}
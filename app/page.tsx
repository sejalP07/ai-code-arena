import { AppShell } from "@/components/layout/app-shell";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-500">
          Welcome to AI Code Arena.
        </p>
      </div>
    </AppShell>
  );
}
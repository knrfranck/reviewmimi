"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
      <h1 className="text-xl font-bold text-slate-900">Something went wrong</h1>
      <p className="max-w-md text-center text-sm text-slate-600">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

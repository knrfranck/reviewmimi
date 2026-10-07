import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
      <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="text-slate-600">The page you requested does not exist.</p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Go to home
      </Link>
    </div>
  );
}

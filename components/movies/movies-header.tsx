import Link from "next/link";

export function MoviesHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-blue-600">
            ReviewMimi
          </Link>
          <nav className="hidden items-center gap-4 sm:flex">
            <Link
              href="/movies"
              className="text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              Movie Lounge
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-slate-500 hover:text-blue-600"
            >
              Categories
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/movies/new"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Add a movie
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}

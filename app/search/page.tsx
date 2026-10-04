import Link from "next/link";

const categories: Record<string, { label: string; emoji: string }> = {
  all: { label: "All Categories", emoji: "📂" },
  food_dining: { label: "Food & Dining", emoji: "🍔" },
  travel_tours: { label: "Travel & Tours", emoji: "🏨" },
  shopping_retail: { label: "Shopping & Retail", emoji: "🛍️" },
  nightlife: { label: "Nightlife", emoji: "🌙" },
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const categoryKey = params.category && categories[params.category] ? params.category : "all";
  const categoryLabel = categories[categoryKey].label;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold text-blue-600">
            ReviewMimi
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Search results
          </p>

          {query ? (
            <>
              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Results for <span className="text-blue-600">"{query}"</span>
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                {categoryKey === "all"
                  ? "Showing results across all categories."
                  : `Showing results in ${categoryLabel}.`}
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Search businesses and reviews
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Enter a search term on the homepage to find businesses by name, service, or location.
              </p>
            </>
          )}

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <p className="text-slate-700">
              ReviewMimi search is now connected to a query-driven results page. Results are still coming soon, but your search query and category selection are now preserved in the URL.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(categories).map(([slug, category]) => (
              <Link
                key={slug}
                href={slug === "all" ? "/categories" : `/categories/${slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-900 shadow-sm transition hover:border-blue-400 hover:shadow-lg"
              >
                <div className="text-4xl">{category.emoji}</div>
                <p className="mt-4 text-lg font-semibold">{category.label}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-between gap-4">
            <Link
              href="/"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Back to home
            </Link>
            <Link
              href="/categories"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

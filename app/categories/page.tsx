import Link from "next/link";
import { categoryTaxonomy } from "@/lib/category-taxonomy";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold text-blue-600">
            ReviewMimi
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Sign in to review
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Browse categories
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Discover businesses by category
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Explore restaurants, hotels, retail stores, and more — then share your experience with the
            community.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTaxonomy.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-blue-400 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="rounded-2xl bg-blue-50 px-3 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
                  {category.subcategories.length} areas
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{category.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {category.subcategories.map((subcategory) => subcategory.name).join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

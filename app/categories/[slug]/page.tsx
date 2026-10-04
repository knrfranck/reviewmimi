import Link from "next/link";
import { notFound } from "next/navigation";
import { findTaxonomyCategory, findTaxonomySubcategory } from "@/lib/category-taxonomy";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = findTaxonomyCategory(slug);
  const subcategory = findTaxonomySubcategory(slug);

  if (!category && !subcategory) {
    notFound();
  }

  const title = category?.name ?? subcategory?.name ?? "Category";
  const description = category
    ? `Explore ${category.subcategories.length} areas across ${category.name.toLowerCase()}.`
    : `Businesses and listings in ${subcategory?.categoryName.toLowerCase()}.`;
  const subcategories = category?.subcategories ?? (subcategory ? [subcategory] : []);
  const businesses = subcategories.flatMap((item) => item.items);

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
        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          {title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">{description}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {subcategories.map((item) => (
            <section key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{item.items.length} seeded listings</p>
              <ul className="mt-4 space-y-3 text-left">
                {item.items.slice(0, 6).map((business) => (
                  <li key={`${item.id}-${business.name}`} className="flex items-start justify-between gap-4 border-t border-slate-100 pt-3">
                    <span className="font-medium text-slate-800">{business.name}</span>
                    <span className="shrink-0 text-right text-xs text-slate-500">{business.location}</span>
                  </li>
                ))}
                {item.items.length === 0 && <li className="text-sm text-slate-500">No listings seeded yet.</li>}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          {businesses.length} listings are ready for review.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Create account
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MoviesHeader } from "@/components/movies/movies-header";
import { AddMovieForm } from "@/components/movies/add-movie-form";

export const metadata = {
  title: "Add a Movie | ReviewMimi",
};

export default function NewMoviePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <MoviesHeader />

      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <Link
          href="/movies"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-violet-600"
        >
          <ArrowLeft className="size-4" />
          Back to Movie Lounge
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Add a movie</h1>
          <p className="mt-2 text-sm text-slate-600">
            Share a film with the community. Once added, anyone can review it or
            create polls about it.
          </p>
          <div className="mt-6">
            <AddMovieForm />
          </div>
        </div>
      </main>
    </div>
  );
}

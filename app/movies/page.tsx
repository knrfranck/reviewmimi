import Link from "next/link";
import { Film, Plus } from "lucide-react";
import { MoviesHeader } from "@/components/movies/movies-header";
import { MovieCard } from "@/components/movies/movie-card";
import { getMovies, getMoviePolls, getMovieReviews } from "@/lib/movies";

export const metadata = {
  title: "Movie Lounge | ReviewMimi",
  description: "Post movies, write reviews, and create polls with the community.",
};

export default async function MoviesPage() {
  const movies = await getMovies();

  const moviesWithStats = await Promise.all(
    movies.map(async (movie) => {
      const [reviews, polls] = await Promise.all([
        getMovieReviews(movie.id),
        getMoviePolls(movie.id),
      ]);
      const average =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;
      return {
        movie,
        reviewCount: reviews.length,
        averageRating: average,
        pollCount: polls.length,
      };
    })
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <MoviesHeader />

      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 flex justify-center">
            <Film className="size-12 opacity-90" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Movie Lounge
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-100">
            A community space just for movies. Anyone can add a film, share a
            review, or spin up a poll for others to vote on.
          </p>
          <Link
            href="/movies/new"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-violet-700 shadow hover:bg-violet-50"
          >
            <Plus className="size-5" />
            Add a movie
          </Link>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        {moviesWithStats.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <span className="text-5xl">🍿</span>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No movies yet
            </h2>
            <p className="mt-2 text-slate-600">
              Be the first to add a movie and kick off the conversation.
            </p>
            <Link
              href="/movies/new"
              className="mt-6 inline-block rounded-lg bg-violet-600 px-5 py-2.5 font-semibold text-white hover:bg-violet-700"
            >
              Add the first movie
            </Link>
          </div>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Community picks
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moviesWithStats.map(({ movie, reviewCount, averageRating, pollCount }) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  reviewCount={reviewCount}
                  averageRating={averageRating}
                  pollCount={pollCount}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        <Link href="/" className="hover:text-violet-600">
          Back to ReviewMimi
        </Link>
      </footer>
    </div>
  );
}

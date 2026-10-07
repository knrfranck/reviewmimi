import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { MoviesHeader } from "@/components/movies/movies-header";
import { ReviewForm, ReviewList } from "@/components/movies/review-section";
import { PollForm, PollList } from "@/components/movies/poll-section";
import {
  getMovie,
  getMoviePolls,
  getMovieReviewStats,
  getMovieReviews,
} from "@/lib/movies";

type PageProps = {
  params: Promise<{ movieId: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { movieId } = await params;
  const movie = await getMovie(movieId);
  if (!movie) return { title: "Movie not found" };
  return { title: `${movie.title} | Movie Lounge` };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { movieId } = await params;
  const movie = await getMovie(movieId);

  if (!movie) notFound();

  const [reviews, polls, stats] = await Promise.all([
    getMovieReviews(movieId),
    getMoviePolls(movieId),
    getMovieReviewStats(movieId),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <MoviesHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Link
          href="/movies"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-violet-600"
        >
          <ArrowLeft className="size-4" />
          All movies
        </Link>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row">
            <div className="flex h-56 shrink-0 items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100 sm:h-auto sm:w-48">
              {movie.posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-6xl">🎬</span>
              )}
            </div>
            <div className="flex-1 p-6">
              <h1 className="text-3xl font-bold text-slate-900">{movie.title}</h1>
              <p className="mt-2 text-slate-500">
                {movie.year ? `${movie.year}` : "Year unknown"}
                {movie.genre ? ` · ${movie.genre}` : ""}
              </p>
              {stats.count > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-900">
                      {stats.average.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">
                    ({stats.count} review{stats.count !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
              {movie.description && (
                <p className="mt-4 text-slate-700">{movie.description}</p>
              )}
              <p className="mt-4 text-xs text-slate-400">
                Added by {movie.authorName} ·{" "}
                {new Date(movie.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Reviews</h2>
            <div className="space-y-6">
              <ReviewForm movieId={movieId} />
              <ReviewList reviews={reviews} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Polls</h2>
            <div className="space-y-6">
              <PollForm movieId={movieId} />
              <PollList polls={polls} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { Star, MessageSquare, BarChart3 } from "lucide-react";
import type { Movie } from "@/lib/types/movies";

interface MovieCardProps {
  movie: Movie;
  reviewCount?: number;
  averageRating?: number;
  pollCount?: number;
}

export function MovieCard({
  movie,
  reviewCount = 0,
  averageRating = 0,
  pollCount = 0,
}: MovieCardProps) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-violet-300 hover:shadow-lg"
    >
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100">
        {movie.posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl">🎬</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-violet-700">
          {movie.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {movie.year ? `${movie.year}` : "Year unknown"}
          {movie.genre ? ` · ${movie.genre}` : ""}
        </p>
        {movie.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {movie.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          {reviewCount > 0 && (
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {averageRating.toFixed(1)} ({reviewCount})
            </span>
          )}
          {reviewCount === 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3.5" />
              No reviews yet
            </span>
          )}
          {pollCount > 0 && (
            <span className="flex items-center gap-1">
              <BarChart3 className="size-3.5" />
              {pollCount} poll{pollCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Posted by {movie.authorName}
        </p>
      </div>
    </Link>
  );
}

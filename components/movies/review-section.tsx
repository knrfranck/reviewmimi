"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createReview } from "@/app/movies/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { MovieReview } from "@/lib/types/movies";

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="rounded p-0.5 transition hover:scale-110"
        >
          <Star
            className={`size-7 ${
              star <= value
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewForm({ movieId }: { movieId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("movieId", movieId);
    formData.set("rating", String(rating));
    if (user) formData.set("authorId", user.uid);

    const result = await createReview(formData);
    setLoading(false);

    if (result.success) {
      router.refresh();
      e.currentTarget.reset();
      setRating(0);
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-900">Write a review</h3>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Your rating *</Label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {!user && (
        <div className="space-y-2">
          <Label htmlFor="reviewAuthorName">Your name *</Label>
          <Input id="reviewAuthorName" name="authorName" required placeholder="Your name" />
        </div>
      )}
      {user && (
        <input type="hidden" name="authorName" value={user.displayName || user.email || "User"} />
      )}

      <div className="space-y-2">
        <Label htmlFor="body">Your review *</Label>
        <textarea
          id="body"
          name="body"
          rows={4}
          required
          minLength={10}
          placeholder="What did you think of this movie?"
          className="w-full rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        />
      </div>

      <Button type="submit" disabled={loading} size="sm" className="bg-violet-600 hover:bg-violet-700">
        {loading ? "Posting..." : "Post review"}
      </Button>
    </form>
  );
}

export function ReviewList({ reviews }: { reviews: MovieReview[] }) {
  if (reviews.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
        No reviews yet. Be the first to share your thoughts!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-slate-900">{review.authorName}</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${
                    i < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{review.body}</p>
          <p className="mt-2 text-xs text-slate-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </article>
      ))}
    </div>
  );
}

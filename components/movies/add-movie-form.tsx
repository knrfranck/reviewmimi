"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createMovie } from "@/app/movies/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AddMovieForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (user) {
      formData.set("createdBy", user.uid);
      const name = formData.get("authorName");
      if (!name) formData.set("authorName", user.displayName || user.email || "Anonymous");
    }

    const result = await createMovie(formData);
    setLoading(false);

    if (result.success && result.movieId) {
      router.push(`/movies/${result.movieId}`);
    } else if (!result.success) {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Movie title *</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. The Dark Knight"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="year">Release year</Label>
          <Input id="year" name="year" type="number" placeholder="2008" min={1888} max={2100} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input id="genre" name="genre" placeholder="Action, Drama..." />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="What's this movie about?"
          className="w-full rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="posterUrl">Poster image URL</Label>
        <Input id="posterUrl" name="posterUrl" type="url" placeholder="https://..." />
      </div>

      {!user && (
        <div className="space-y-2">
          <Label htmlFor="authorName">Your name *</Label>
          <Input id="authorName" name="authorName" placeholder="How should we credit you?" required />
        </div>
      )}

      {user && (
        <input type="hidden" name="authorName" value={user.displayName || user.email || "User"} />
      )}

      <Button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-700">
        {loading ? "Adding movie..." : "Add movie"}
      </Button>
    </form>
  );
}

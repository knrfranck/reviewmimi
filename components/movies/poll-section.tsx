"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createPoll, votePoll } from "@/app/movies/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { MoviePoll } from "@/lib/types/movies";

const VOTER_KEY_STORAGE = "reviewmimi_poll_voter";

function getVoterKey(): string {
  if (typeof window === "undefined") return "";
  let key = localStorage.getItem(VOTER_KEY_STORAGE);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(VOTER_KEY_STORAGE, key);
  }
  return key;
}

function PollCard({ poll }: { poll: MoviePoll }) {
  const router = useRouter();
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [localOptions, setLocalOptions] = useState(poll.options);

  useEffect(() => {
    const voted = localStorage.getItem(`poll_voted_${poll.id}`);
    if (voted) setVotedOption(voted);
  }, [poll.id]);

  const totalVotes = localOptions.reduce((sum, o) => sum + o.votes, 0);

  async function handleVote(optionId: string) {
    if (votedOption) return;
    setError(null);
    setLoading(true);

    const result = await votePoll(poll.id, optionId, getVoterKey());
    setLoading(false);

    if (result.success) {
      localStorage.setItem(`poll_voted_${poll.id}`, optionId);
      setVotedOption(optionId);
      setLocalOptions((prev) =>
        prev.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o))
      );
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="font-medium text-slate-900">{poll.question}</p>
      <p className="mt-1 text-xs text-slate-400">
        by {poll.authorName} · {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
      </p>

      {error && (
        <Alert variant="destructive" className="mt-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4 space-y-2">
        {localOptions.map((option) => {
          const pct = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = votedOption === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={!!votedOption || loading}
              onClick={() => handleVote(option.id)}
              className={`relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left text-sm transition ${
                votedOption
                  ? "cursor-default border-slate-200"
                  : "cursor-pointer border-slate-200 hover:border-violet-300 hover:bg-violet-50"
              } ${isSelected ? "border-violet-400 ring-1 ring-violet-200" : ""}`}
            >
              {votedOption && (
                <div
                  className="absolute inset-y-0 left-0 bg-violet-100 transition-all"
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex items-center justify-between gap-2">
                <span className="text-slate-800">{option.text}</span>
                {votedOption && (
                  <span className="shrink-0 text-xs font-medium text-violet-700">
                    {pct.toFixed(0)}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PollList({ polls }: { polls: MoviePoll[] }) {
  if (polls.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
        No polls yet. Start one below!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
}

export function PollForm({ movieId }: { movieId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [optionCount, setOptionCount] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("movieId", movieId);
    if (user) formData.set("createdBy", user.uid);

    const result = await createPoll(formData);
    setLoading(false);

    if (result.success) {
      router.refresh();
      setExpanded(false);
      e.currentTarget.reset();
      setOptionCount(2);
    } else {
      setError(result.error);
    }
  }

  if (!expanded) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => setExpanded(true)}
        className="w-full border-dashed border-violet-300 text-violet-700 hover:bg-violet-50"
      >
        <Plus className="size-4" />
        Create a poll
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-violet-200 bg-violet-50/50 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Create a poll</h3>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-600"
        >
          <X className="size-4" />
        </button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="question">Poll question *</Label>
        <Input
          id="question"
          name="question"
          required
          placeholder="e.g. Who was the best character?"
        />
      </div>

      <div className="space-y-2">
        <Label>Options *</Label>
        {Array.from({ length: optionCount }).map((_, i) => (
          <Input
            key={i}
            name="options"
            required
            placeholder={`Option ${i + 1}`}
          />
        ))}
        {optionCount < 6 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOptionCount((c) => c + 1)}
          >
            <Plus className="size-3" />
            Add option
          </Button>
        )}
      </div>

      {!user && (
        <div className="space-y-2">
          <Label htmlFor="pollAuthorName">Your name *</Label>
          <Input id="pollAuthorName" name="authorName" required placeholder="Your name" />
        </div>
      )}
      {user && (
        <input type="hidden" name="authorName" value={user.displayName || user.email || "User"} />
      )}

      <Button type="submit" disabled={loading} size="sm" className="bg-violet-600 hover:bg-violet-700">
        {loading ? "Creating..." : "Launch poll"}
      </Button>
    </form>
  );
}

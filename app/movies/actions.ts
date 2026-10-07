"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";

type ActionResult = { success: true } | { success: false; error: string };

function generateId() {
  return crypto.randomUUID();
}

export async function createMovie(formData: FormData): Promise<ActionResult & { movieId?: string }> {
  const title = (formData.get("title") as string)?.trim();
  const authorName = (formData.get("authorName") as string)?.trim();
  const yearStr = (formData.get("year") as string)?.trim();
  const genre = (formData.get("genre") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const posterUrl = (formData.get("posterUrl") as string)?.trim();
  const createdBy = (formData.get("createdBy") as string)?.trim() || undefined;

  if (!title || title.length < 1) {
    return { success: false, error: "Movie title is required." };
  }
  if (!authorName || authorName.length < 2) {
    return { success: false, error: "Your name is required (at least 2 characters)." };
  }

  const year = yearStr ? parseInt(yearStr, 10) : undefined;
  if (yearStr && (isNaN(year!) || year! < 1888 || year! > 2100)) {
    return { success: false, error: "Please enter a valid release year." };
  }

  try {
    const docRef = await adminDb.collection("movies").add({
      title,
      authorName,
      createdBy: createdBy || null,
      year: year || null,
      genre: genre || null,
      description: description || null,
      posterUrl: posterUrl || null,
      createdAt: new Date().toISOString(),
    });

    revalidatePath("/movies");
    return { success: true, movieId: docRef.id };
  } catch {
    return { success: false, error: "Failed to add movie. Please try again." };
  }
}

export async function createReview(formData: FormData): Promise<ActionResult> {
  const movieId = formData.get("movieId") as string;
  const authorName = (formData.get("authorName") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();
  const ratingStr = formData.get("rating") as string;
  const authorId = (formData.get("authorId") as string)?.trim() || undefined;

  if (!movieId) return { success: false, error: "Movie not found." };
  if (!authorName || authorName.length < 2) {
    return { success: false, error: "Your name is required." };
  }
  if (!body || body.length < 10) {
    return { success: false, error: "Review must be at least 10 characters." };
  }

  const rating = parseInt(ratingStr, 10);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5." };
  }

  try {
    const movieDoc = await adminDb.collection("movies").doc(movieId).get();
    if (!movieDoc.exists) {
      return { success: false, error: "Movie not found." };
    }

    await adminDb.collection("movieReviews").add({
      movieId,
      authorName,
      authorId: authorId || null,
      rating,
      body,
      createdAt: new Date().toISOString(),
    });

    revalidatePath(`/movies/${movieId}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to post review. Please try again." };
  }
}

export async function createPoll(formData: FormData): Promise<ActionResult> {
  const movieId = formData.get("movieId") as string;
  const question = (formData.get("question") as string)?.trim();
  const authorName = (formData.get("authorName") as string)?.trim();
  const createdBy = (formData.get("createdBy") as string)?.trim() || undefined;
  const optionTexts = formData.getAll("options") as string[];

  if (!movieId) return { success: false, error: "Movie not found." };
  if (!question || question.length < 5) {
    return { success: false, error: "Poll question must be at least 5 characters." };
  }
  if (!authorName || authorName.length < 2) {
    return { success: false, error: "Your name is required." };
  }

  const validOptions = optionTexts.map((t) => t.trim()).filter((t) => t.length > 0);
  if (validOptions.length < 2) {
    return { success: false, error: "Add at least 2 poll options." };
  }
  if (validOptions.length > 6) {
    return { success: false, error: "Maximum 6 poll options allowed." };
  }

  try {
    const movieDoc = await adminDb.collection("movies").doc(movieId).get();
    if (!movieDoc.exists) {
      return { success: false, error: "Movie not found." };
    }

    const options = validOptions.map((text) => ({
      id: generateId(),
      text,
      votes: 0,
    }));

    await adminDb.collection("polls").add({
      movieId,
      question,
      options,
      authorName,
      createdBy: createdBy || null,
      createdAt: new Date().toISOString(),
    });

    revalidatePath(`/movies/${movieId}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create poll. Please try again." };
  }
}

export async function votePoll(
  pollId: string,
  optionId: string,
  voterKey: string
): Promise<ActionResult> {
  if (!pollId || !optionId || !voterKey) {
    return { success: false, error: "Invalid vote." };
  }

  const voteDocId = `${pollId}_${voterKey}`;

  try {
    const voteRef = adminDb.collection("pollVotes").doc(voteDocId);
    const existingVote = await voteRef.get();
    if (existingVote.exists) {
      return { success: false, error: "You already voted on this poll." };
    }

    const pollRef = adminDb.collection("polls").doc(pollId);
    const pollDoc = await pollRef.get();
    if (!pollDoc.exists) {
      return { success: false, error: "Poll not found." };
    }

    const data = pollDoc.data()!;
    const options = data.options as { id: string; text: string; votes: number }[];
    const optionIndex = options.findIndex((o) => o.id === optionId);
    if (optionIndex === -1) {
      return { success: false, error: "Option not found." };
    }

    options[optionIndex].votes += 1;

    await adminDb.runTransaction(async (transaction) => {
      transaction.update(pollRef, { options });
      transaction.set(voteRef, {
        pollId,
        optionId,
        voterKey,
        createdAt: new Date().toISOString(),
      });
    });

    revalidatePath(`/movies/${data.movieId}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to record vote. Please try again." };
  }
}

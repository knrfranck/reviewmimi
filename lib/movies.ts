import { adminDb } from "@/lib/firebase-admin";
import type { Movie, MoviePoll, MovieReview } from "@/lib/types/movies";

function docToMovie(id: string, data: FirebaseFirestore.DocumentData): Movie {
  return {
    id,
    title: data.title,
    year: data.year,
    genre: data.genre,
    description: data.description,
    posterUrl: data.posterUrl,
    authorName: data.authorName,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
  };
}

export async function getMovies(): Promise<Movie[]> {
  try {
    const snapshot = await adminDb
      .collection("movies")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    return snapshot.docs.map((doc) => docToMovie(doc.id, doc.data()));
  } catch {
    return [];
  }
}

export async function getMovie(movieId: string): Promise<Movie | null> {
  try {
    const doc = await adminDb.collection("movies").doc(movieId).get();
    if (!doc.exists) return null;

    const data = doc.data();
    if (!data) return null;

    return docToMovie(doc.id, data);
  } catch {
    return null;
  }
}

export async function getMovieReviews(movieId: string): Promise<MovieReview[]> {
  try {
    const snapshot = await adminDb
      .collection("movieReviews")
      .where("movieId", "==", movieId)
      .limit(50)
      .get();

    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          movieId: data.movieId,
          authorName: data.authorName,
          authorId: data.authorId,
          rating: data.rating,
          body: data.body,
          createdAt: data.createdAt,
        };
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function getMoviePolls(movieId: string): Promise<MoviePoll[]> {
  try {
    const snapshot = await adminDb
      .collection("polls")
      .where("movieId", "==", movieId)
      .limit(20)
      .get();

    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          movieId: data.movieId,
          question: data.question,
          options: data.options,
          authorName: data.authorName,
          createdBy: data.createdBy,
          createdAt: data.createdAt,
        };
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function getMovieReviewStats(
  movieId: string
): Promise<{ count: number; average: number }> {
  const reviews = await getMovieReviews(movieId);
  if (reviews.length === 0) return { count: 0, average: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return { count: reviews.length, average: sum / reviews.length };
}

export interface Movie {
  id: string;
  title: string;
  year?: number;
  genre?: string;
  description?: string;
  posterUrl?: string;
  authorName: string;
  createdBy?: string;
  createdAt: string;
}

export interface MovieReview {
  id: string;
  movieId: string;
  authorName: string;
  authorId?: string;
  rating: number;
  body: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface MoviePoll {
  id: string;
  movieId: string;
  question: string;
  options: PollOption[];
  authorName: string;
  createdBy?: string;
  createdAt: string;
}

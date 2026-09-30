import { Movie, MoviesResponse } from "./movie";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const MOVIE_CATEGORIES = [
  "popular",
  "now-playing",
  "top-rated",
  "upcoming",
] as const;

export type MovieCategory = (typeof MOVIE_CATEGORIES)[number];

type MovieEndpoint = "popular" | "now_playing" | "top_rated" | "upcoming";

const categoryEndpoints: Record<MovieCategory, MovieEndpoint> = {
  popular: "popular",
  "now-playing": "now_playing",
  "top-rated": "top_rated",
  upcoming: "upcoming",
};

function isMovieCategory(value: string): value is MovieCategory {
  return MOVIE_CATEGORIES.includes(value as MovieCategory);
}

export { isMovieCategory };

export async function getMovies(
  category: MovieCategory,
  page = 1,
): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not configured");
  }

  const endpoint = categoryEndpoints[category];
  const url = new URL(`https://api.themoviedb.org/3/movie/${endpoint}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("TMDB error:", response.status, body);
    throw new Error(`TMDB has error ${response.status}`);
  }

  const data = (await response.json()) as MoviesResponse;
  return data.results;
}

// Оставляем старое имя функции, чтобы существующий код не ломался.
export async function getPopularMovies(page = 1): Promise<Movie[]> {
  return getMovies("popular", page);
}

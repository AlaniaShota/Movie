// types/movie.ts
export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
};

export type PopularMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

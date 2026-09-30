import axios from "axios";
import { Movie, PopularMoviesResponse } from "./movie";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
  },
});

const upcoming = "upcoming";

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  try {
    const { data } = await tmdb.get<PopularMoviesResponse>(
      `/movie/${upcoming}`,
      {
        params: { page },
      },
    );
    return data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const body = JSON.stringify(error.response?.data);
      console.error("TMDB error:", status, body);
      throw new Error(`TMDB has error ${status}: ${body}`);
    }
    throw error;
  }
}

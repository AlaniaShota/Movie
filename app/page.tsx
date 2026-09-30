
import MovieList from "./components/movieList";

export default async function Home() {
  return (
    <>
      <MovieList category="popular" title="Popular Movies" limit={6} />
      <MovieList category="now-playing" title="Now Playing" limit={6} />
      <MovieList category="top-rated" title="Top Rated" limit={6} />
      <MovieList category="upcoming" title="Upcoming Movies" limit={6} />
    </>
  );
}

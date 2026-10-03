import MovieScrollStackList from "./components/movie/movieScrollStackList";
import MovieList from "./components/movie/movieList";

export default async function Home() {
  return (
    <>
      <MovieScrollStackList
        category="popular"
        title="Popular Movies"
        limit={6}
        animation="stack"
      />
      <MovieList
        category="now-playing"
        title="Now Playing"
        limit={6}
       
      />
      <MovieList
        category="top-rated"
        title="Top Rated"
        limit={6}
       
      />
      <MovieList
        category="upcoming"
        title="Upcoming Movies"
        limit={6}
       
      />
    </>
  );
}

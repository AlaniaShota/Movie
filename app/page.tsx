import Image from "next/image";
type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
};

async function getPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
    
  );
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("TMDB error:", res.status, errorBody);
    throw new Error(`TMDB ответил с ошибкой ${res.status}: ${errorBody}`);
  }

  return res.json();
}
export default async function Home() {
 const data = await getPopularMovies();
  const movies: Movie[] = data.results;
console.log("Fetched movies:", movies); // Логируем полученные фильмы
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Popular Movies</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id}>
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
                width={500}
                height={750}
              />
            )}
            <h3>{movie.title}</h3>
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

import Image from "next/image";
import { getPopularMovies, IMAGE_BASE_URL } from "../api/popularMovie";

export const revalidate = 3600;
export default async function Card() {
  const movies = await getPopularMovies();
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
                src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
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

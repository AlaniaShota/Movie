import Image from "next/image";
import { getMovies, IMAGE_BASE_URL, MovieCategory } from "../lib/tmdb";


type CardProps = {
  category?: MovieCategory;
  title?: string;
};

const defaultTitles: Record<MovieCategory, string> = {
  popular: "Popular Movies",
  "now-playing": "Now Playing",
  "top-rated": "Top Rated",
  upcoming: "Upcoming Movies",
};

export default async function Card({
  category = "popular",
  title,
}: CardProps) {
  const movies = await getMovies(category);
  const heading = title ?? defaultTitles[category];

  return (
    <main id={category} className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-brand-mist">{heading}</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <article key={movie.id}>
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="h-auto w-full rounded-lg object-cover"
              />
            ) : (
              <div className="aspect-[2/3] rounded-lg bg-brand-helmet" />
            )}

            <h2 className="mt-3 line-clamp-2 text-sm font-semibold text-brand-mist">
              {movie.title}
            </h2>
            <p className="mt-1 text-sm text-brand-gold">
              {movie.vote_average.toFixed(1)}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}

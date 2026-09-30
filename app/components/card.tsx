import Image from "next/image";
import Link from "next/link";
import {
  getMovies,
  IMAGE_BASE_URL,
  MovieCategory,
} from "../lib/tmdb";

type CardProps = {
  category?: MovieCategory;
  title?: string;
  limit?: number;
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
  limit,
}: CardProps) {
  const movies = await getMovies(category);

  const heading = title ?? defaultTitles[category];

  const displayedMovies = limit
    ? movies.slice(0, limit)
    : movies;

  return (
    <section
      id={category}
      className="mx-auto w-full max-w-7xl px-6 py-10"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-brand-mist">
          {heading}
        </h2>

        {limit && (
          <Link
            href={`/${category}`}
            className="text-sm font-medium text-brand-gold transition hover:opacity-80"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {displayedMovies.map((movie) => (
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

            <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-brand-mist">
              {movie.title}
            </h3>

            <p className="mt-1 text-sm text-brand-gold">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
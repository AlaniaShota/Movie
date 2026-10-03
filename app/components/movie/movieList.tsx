import Image from "next/image";

import {
  getMovies,
  IMAGE_BASE_URL,
  MovieCategory,
} from "../../lib/tmdb";

import AnimatedSectionHeader from "../AnimatedSectionHeader";
import Link from "next/link";

type MovieListProps = {
  category?: MovieCategory;
  title?: string;
  limit?: number;
  animation?: "none" | "stack";
};

const defaultTitles: Record<MovieCategory, string> = {
  popular: "Popular Movies",
  "now-playing": "Now Playing",
  "top-rated": "Top Rated",
  upcoming: "Upcoming Movies",
};

export default async function MovieList({
  category = "popular",
  title,
  limit,

}: MovieListProps) {
  const movies = await getMovies(category);

  const heading = title ?? defaultTitles[category];

  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  const seeAllHref = `/${category}`;


    return (
      <section id={category} className="mx-auto w-full max-w-7xl">
        <div className="px-6 pt-10">
          <AnimatedSectionHeader
            title={heading}
            href={limit ? seeAllHref : undefined}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 pt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {displayedMovies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="relative block"
            >
              {movie.poster_path ? (
                <Image
                  src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="h-auto w-full rounded-lg object-cover"
                />
              ) : (
                <div className="aspect-2/3 rounded-lg bg-brand-helmet" />
              )}

              <h3 className="mt-3 text-sm font-semibold text-brand-mist">
                {movie.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    );
  }


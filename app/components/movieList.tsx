import Image from "next/image";
import Link from "next/link";

import {
  getMovies,
  IMAGE_BASE_URL,
  MovieCategory,
} from "../lib/tmdb";

import ScrollStack from "./ScrollStack";

type MovieListProps = {
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

export default async function MovieList({
  category = "popular",
  title,
  limit,
}: MovieListProps) {
  const movies = await getMovies(category);

  const heading = title ?? defaultTitles[category];

  const displayedMovies = limit
    ? movies.slice(0, limit)
    : movies;

  return (
    <section className="relative w-full overflow-hidden">

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-10">
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

      {/* Анимация */}
      <ScrollStack
        className="h-[450px] bg-brand-navy"
        options={{
          itemSelector: "[data-scroll-item]",
          decorationSelector:
            "[data-scroll-decoration]",

          scrollPerItem: 700,
          scrub: 1,

          initialScale: 0.8,
          initialOpacity: 0.25,

          leavingScale: 0.75,
          leavingOpacity: 0.2,

          decorationLeaveX: -80,
        }}
      >
        {displayedMovies.map((movie, index) => (
          <article
            key={movie.id}
            data-scroll-item
            className="
              relative
              overflow-visible
              rounded-2xl
            "
          >
            {/* Большая цифра */}
            <div
              data-scroll-decoration
              className="
                pointer-events-none
                absolute
                -left-24
                bottom-0
                z-100
                select-none
                text-[180px]
                font-black
                leading-none
                text-white/10

                md:-left-32
                md:text-[260px]
              "
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Карточка */}
            <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl bg-brand-helmet shadow-2xl">
              {movie.poster_path ? (
                <Image
                  src={`${IMAGE_BASE_URL}/w780${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  priority={index === 0}
                  sizes="
                    (max-width: 767px) 76vw,
                    (max-width: 1023px) 430px,
                    520px
                  "
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-brand-helmet" />
              )}

              {/* Затемнение */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

              {/* Информация */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-sm font-bold text-brand-gold">
                    #{index + 1}
                  </span>

                  <span className="h-px w-8 bg-white/30" />

                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {category}
                  </span>
                </div>

                <h3 className="text-3xl font-black leading-tight text-white md:text-5xl">
                  {movie.title}
                </h3>

                <p className="mt-3 text-sm text-white/50">
                  Rating:{" "}
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </ScrollStack>
    </section>
  );
}
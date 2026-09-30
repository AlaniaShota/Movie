import Image from "next/image";

import {
  getMovies,
  IMAGE_BASE_URL,
  MovieCategory,
} from "../lib/tmdb";

import ScrollStack from "./ScrollStack";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

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
  animation = "none",
}: MovieListProps) {
  const movies = await getMovies(category);

  const heading =
    title ?? defaultTitles[category];

  const displayedMovies = limit
    ? movies.slice(0, limit)
    : movies;

  const seeAllHref = `/${category}`;


  if (animation === "none") {
    return (
      <section
        id={category}
        className="mx-auto w-full max-w-7xl"
      >
        <div className="px-6 pt-10">
          <AnimatedSectionHeader
            title={heading}
            href={limit ? seeAllHref : undefined}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 pt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {displayedMovies.map((movie) => (
            <article
              key={movie.id}
              className="relative"
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

              <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-brand-mist">
                {movie.title}
              </h3>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={category}
      className="relative w-full"
    >
      <ScrollStack
        className="bg-brand-navy"
        options={{
          itemSelector:
            "[data-scroll-item]",

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
        {/* HEADER */}

        <div className="absolute left-6 right-6 top-8 z-200 md:left-12 md:right-12 md:top-10">
          <AnimatedSectionHeader
            title={heading}
            href={limit ? seeAllHref : undefined}
          />
        </div>

        {/* BACKGROUND */}

        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-sky/10 blur-[140px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />
        </div>

        {/* MOVIES */}

        {displayedMovies.map(
          (movie, index) => (
            <article
              key={movie.id}
              data-scroll-item
              className="
                relative
                overflow-visible
                rounded-2xl
              "
            >
              {/* BIG NUMBER */}

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
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </div>

              {/* POSTER */}

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

                {/* GRADIENT */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* INFO */}

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
                  <span className="text-brand-gold">{movie.vote_average.toFixed(1)}</span>
                  </p>
                </div>
              </div>
            </article>
          ),
        )}
      </ScrollStack>
    </section>
  );
}
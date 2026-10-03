
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getMovieById,
  IMAGE_BASE_URL,
} from "@/app/lib/tmdb";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const movieId = Number(id);

  if (!Number.isInteger(movieId) || movieId <= 0) {
    notFound();
  }

  let movie;

  try {
    movie = await getMovieById(movieId);
  } catch {
    notFound();
  }
console.log(movie);
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div>
          {movie.poster_path ? (
            <Image
              src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full rounded-xl"
            />
          ) : (
            <div className="aspect-2/3 rounded-xl bg-brand-helmet" />
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold text-brand-mist">
            {movie.title}
          </h1>

          <p className="mt-4 text-brand-gold">
            Rating: {movie.vote_average.toFixed(1)}
          </p>

          <p className="mt-6 leading-7 text-brand-mist/80">
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>
    </main>
  );
}
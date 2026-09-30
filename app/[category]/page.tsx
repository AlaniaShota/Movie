import { notFound } from "next/navigation";

import { isMovieCategory } from "../lib/tmdb";
import MovieList from "../components/movieList";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isMovieCategory(category)) {
    notFound();
  }

  return <MovieList category={category} />;
}

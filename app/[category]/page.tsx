import { notFound } from "next/navigation";
import Card from "../components/card";
import { isMovieCategory } from "../lib/tmdb";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isMovieCategory(category)) {
    notFound();
  }

  return <Card category={category} />;
}

import Card from "./components/card";

export default async function Home() {
  return (
    <>
      <Card category="popular" title="Popular Movies" limit={6} />
      <Card category="now-playing" title="Now Playing" limit={6} />
      <Card category="top-rated" title="Top Rated" limit={6} />
      <Card category="upcoming" title="Upcoming Movies" limit={6} />
    </>
  );
}

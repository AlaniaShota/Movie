import Navigation from "./navigation";

export default function Header() {
  return (
    <header className="bg-brand-helmet flex items-center justify-between p-6 text-red-500">
      <h1 className="font-bold cursor-default">MovieDB</h1>
      <Navigation />
    </header>
  );
}

import Navigation from "./navigation";

export default function Header() {
  return (
    <header className="bg-brand-helmet flex gap-6 items-center justify-between p-6 my-6 m-auto rounded-2xl w-auto max-w-7xl">
      <h1 className=" cursor-default text-brand-red">MovieDB</h1>
      <Navigation />
    </header>
  );
}

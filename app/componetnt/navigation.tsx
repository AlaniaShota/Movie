export default function Navigation() {
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Shows", href: "/tv-shows" },
    { name: "Actors", href: "/actors" },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {navigationItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className=" transition-colors duration-200"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
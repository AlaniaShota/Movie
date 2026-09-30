// app/components/navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const items = [
    { name: "Home", href: "/" },
    { name: "Popular Movies", href: "/popular" },
     { name: "Trending", href: "/trending" },
      { name: "Now Playing", href: "/now-playing" },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={pathname === item.href ? "text-brand-gold" : ""}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
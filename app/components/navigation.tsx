"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Home", href: "/" },
  { name: "Popular", href: "/popular" },
  { name: "Now Playing", href: "/now-playing" },
  { name: "Top Rated", href: "/top-rated" },
  { name: "Upcoming", href: "/upcoming" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={`relative z-10 block rounded-full px-4 py-1.5 transition-colors duration-200 ${
                  isActive ? "text-brand-navy" : "hover:text-brand-gold"
                }`}
              >
                {item.name}
              </Link>

              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-brand-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

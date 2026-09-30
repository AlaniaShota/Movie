
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const items = [
  { name: "Home", href: "/" },
  { name: "Popular Movies", href: "/popular" },
  { name: "Trending", href: "/trending" },
  { name: "Now Playing", href: "/now-playing" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex space-x-2">
        {items.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

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
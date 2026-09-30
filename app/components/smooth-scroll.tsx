"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

function ScrollToTop() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll() {
  return (
    <>
      <ReactLenis root options={{ lerp: 0.1, naiveDimensions: true }} />
      <ScrollToTop />
    </>
  );
}

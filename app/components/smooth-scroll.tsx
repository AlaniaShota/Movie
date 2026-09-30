// app/components/smooth-scroll.tsx
"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll() {
  return <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 }, }} />;
}
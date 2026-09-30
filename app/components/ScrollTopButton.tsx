"use client";
import { useLenis } from "lenis/react";

export default function ScrollTopButton() {
  const lenis = useLenis();
  return <button onClick={() => lenis?.scrollTo(0)}>up</button>;
}

"use client";

import {
  ReactNode,
  useRef,
} from "react";
import { ScrollStackOptions, useScrollStack } from "../hook/useScrollStack";


type ScrollStackProps = {
  children: ReactNode;

  className?: string;

  contentClassName?: string;

  options?: ScrollStackOptions;
};

export default function ScrollStack({
  children,
  className = "",
  contentClassName = "",
  options,
}: ScrollStackProps) {
  const containerRef =
    useRef<HTMLElement | null>(null);

  useScrollStack(
    containerRef,
    options,
  );

  return (
    <section
      ref={containerRef}
      className={`
        relative
        h-screen
        overflow-hidden
        ${className}
      `}
    >
      <div
        className={`
          absolute
          inset-0
          ${contentClassName}
        `}
      >
        {children}
      </div>
    </section>
  );
}
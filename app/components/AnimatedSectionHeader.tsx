"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type AnimatedSectionHeaderProps = {
  title: string;
  href?: string;
};

export default function AnimatedSectionHeader({
  title,
  href,
}: AnimatedSectionHeaderProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative z-200 flex items-center justify-between"
    >
      <motion.h2
        initial={{
          opacity: 0,
          x: -30, 

        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-lg font-bold text-brand-mist md:text-5xl"
      >
        {title}
      </motion.h2>

      {href && (
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={href}
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-brand-gold
              transition-colors
              duration-300
              hover:text-brand-mist
            "
          >
            <span className="text-lg">See all</span>

            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{
                duration: 0.2,
              }}
              className="text-base"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
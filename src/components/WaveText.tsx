"use client";

import { motion } from "motion/react";

type Tag = "h1" | "h2" | "h3";

const EASE = [0.65, 0, 0.35, 1] as const;

export function WaveText({
  children,
  className = "",
  as = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Heading = as;

  return (
    <Heading className={`relative inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-accent"
      />
    </Heading>
  );
}

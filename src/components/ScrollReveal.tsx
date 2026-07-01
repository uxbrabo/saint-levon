"use client";

import { motion } from "motion/react";

type Direction = "up" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  left: { x: -40 },
  right: { x: 40 },
  none: {},
};

export function ScrollReveal({
  children,
  threshold = 0.2,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  direction?: Direction;
  className?: string;
}) {
  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

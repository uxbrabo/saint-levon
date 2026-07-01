"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";

const UNIT = "CONFIRA AS NOVIDADES";
const TRACK = Array.from({ length: 12 }, () => UNIT);

function Row({
  x,
  className,
  textClassName,
}: {
  x: MotionValue<string>;
  className: string;
  textClassName: string;
}) {
  return (
    <div className={`flex h-16 items-center overflow-hidden md:h-20 ${className}`}>
      <motion.div style={{ x }} className="flex w-max items-center gap-10 whitespace-nowrap">
        {TRACK.map((label, i) => (
          <span
            key={i}
            className={`font-display flex items-center gap-10 text-lg font-extrabold uppercase tracking-tight md:text-2xl ${textClassName}`}
          >
            {label}
            <span aria-hidden="true">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeBand() {
  const { scrollY } = useScroll();
  const rawLeft = useTransform(scrollY, (v) => -((v * 0.005) % 50));
  const rawRight = useTransform(scrollY, (v) => (v * 0.005) % 50);
  const smoothLeft = useSpring(rawLeft, { stiffness: 40, damping: 20, mass: 1 });
  const smoothRight = useSpring(rawRight, { stiffness: 40, damping: 20, mass: 1 });
  const xLeft = useTransform(smoothLeft, (v) => `${v}%`);
  const xRight = useTransform(smoothRight, (v) => `${v - 50}%`);

  return (
    <div className="mb-16 w-full md:mb-20" aria-hidden="true">
      <Row x={xLeft} className="bg-[#0a0a0a]" textClassName="text-white" />
      <Row x={xRight} className="border-y-2 border-[#0a0a0a] bg-[#e7e7e4]" textClassName="text-[#0a0a0a]" />
    </div>
  );
}

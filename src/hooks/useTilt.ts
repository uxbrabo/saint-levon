"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";

/** Subtle 3D tilt that follows the cursor position within the element. */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(py * -max * 2);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    ref,
    style: { rotateX: springX, rotateY: springY, transformPerspective: 800 },
    onMouseMove,
    onMouseLeave,
  };
}

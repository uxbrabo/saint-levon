"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

export function useCountUp(target: number, durationSec = 1.4) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: durationSec,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, durationSec]);

  return { ref, value };
}

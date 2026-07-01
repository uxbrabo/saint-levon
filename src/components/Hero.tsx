"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Container } from "@/components/layout/Container";
import { StarIcon } from "@/components/icons";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useCountUp } from "@/hooks/useCountUp";

const column: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const {
    ref: magneticRef,
    style: magneticStyle,
    onMouseMove: onMagneticMove,
    onMouseLeave: onMagneticLeave,
  } = useMagnetic<HTMLAnchorElement>(0.35);
  const { ref: counterRef, value: counterValue } = useCountUp(10000);

  return (
    <section
      className="group relative h-screen min-h-[640px] w-full overflow-hidden"
      aria-label="SAINT LEVON — Coleção atual"
    >
      <Image
        src="/videos/hero.jpeg"
        alt="Modelos SAINT LEVON vestindo a coleção atual na praia"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center grayscale transition-[filter] duration-700 group-hover:grayscale-0 sm:object-[68%_center]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent sm:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.4)_42%,rgba(0,0,0,0.05)_70%)] sm:block" />

      <div className="relative z-10 flex h-full items-end pb-14 sm:items-center sm:pb-10 md:pb-16">
        <Container>
          <motion.div variants={column} initial="hidden" animate="show" className="max-w-lg">
            <motion.h1
              variants={item}
              className="font-display text-[clamp(36px,6.4vw,68px)] font-black leading-[0.98] tracking-tight text-white uppercase"
            >
              Feito pra quem vive na água e na rua
            </motion.h1>

            <motion.p variants={item} className="text-body mt-6 max-w-sm text-white/70">
              Tecnologia, conforto e atitude pra cada movimento.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                ref={magneticRef}
                href="/catalogo"
                onMouseMove={onMagneticMove}
                onMouseLeave={onMagneticLeave}
                style={magneticStyle}
                whileTap={{ scale: 0.95 }}
                className="text-cta inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[#0a0a0a] transition-colors duration-200 hover:bg-white/90"
              >
                Ver catálogo
              </motion.a>
              <motion.a
                href="#categorias"
                whileTap={{ scale: 0.95 }}
                className="text-cta inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-white transition-colors duration-200 hover:border-white"
              >
                Categorias
              </motion.a>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-3 w-3 text-white/60" />
                ))}
              </div>
              <p className="text-label text-white/60">
                4.9 · <span ref={counterRef}>{counterValue.toLocaleString("pt-BR")}</span>+ clientes
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

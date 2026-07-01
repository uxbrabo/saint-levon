"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { motion, type Variants, useMotionValue, useSpring, useTransform } from "motion/react";
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

const LENS_RADIUS = 110; // raio do círculo em px
const SPRING_CONFIG = { stiffness: 280, damping: 28, mass: 0.6 };

export function Hero() {
  const {
    ref: magneticRef,
    style: magneticStyle,
    onMouseMove: onMagneticMove,
    onMouseLeave: onMagneticLeave,
  } = useMagnetic<HTMLAnchorElement>(0.35);
  const { ref: counterRef, value: counterValue } = useCountUp(10000);

  const sectionRef = useRef<HTMLElement>(null);

  // Posição raw do mouse (relativa à seção)
  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);

  // Spring suave para o centro do círculo
  const cx = useSpring(rawX, SPRING_CONFIG);
  const cy = useSpring(rawY, SPRING_CONFIG);

  // Raio do círculo — anima na entrada e saída
  const radius = useSpring(0, { stiffness: 350, damping: 26 });

  // clip-path que revela a foto colorida
  const clipPath = useTransform(() => `circle(${radius.get()}px at ${cx.get()}px ${cy.get()}px)`);

  // Posição do anel (ring) da lente — segue o mesmo spring
  const ringX = useTransform(() => cx.get() - LENS_RADIUS);
  const ringY = useTransform(() => cy.get() - LENS_RADIUS);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [rawX, rawY]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Posiciona o centro imediatamente antes de crescer (sem arrastar pela tela)
    rawX.jump(e.clientX - rect.left);
    rawY.jump(e.clientY - rect.top);
    cx.jump(e.clientX - rect.left);
    cy.jump(e.clientY - rect.top);
    radius.set(LENS_RADIUS);
  }, [rawX, rawY, cx, cy, radius]);

  const handleMouseLeave = useCallback(() => {
    radius.set(0);
  }, [radius]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="SAINT LEVON — Coleção atual"
    >
      {/* Camada base — grayscale */}
      <Image
        src="/videos/hero.jpeg"
        alt="Modelos SAINT LEVON vestindo a coleção atual na praia"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] grayscale sm:object-[68%_center]"
      />

      {/* Camada colorida — revelada pelo círculo da lente */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath }}
        aria-hidden="true"
      >
        <Image
          src="/videos/hero.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_center] sm:object-[68%_center]"
        />
        {/* Brilho sutil na borda interna da lente */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
      </motion.div>

      {/* Anel da lente — segue o cursor com spring */}
      <motion.div
        className="pointer-events-none absolute rounded-full border border-white/30 backdrop-blur-[1px]"
        style={{
          width: LENS_RADIUS * 2,
          height: LENS_RADIUS * 2,
          x: ringX,
          y: ringY,
          opacity: useTransform(radius, [0, 30], [0, 1]),
        }}
        aria-hidden="true"
      />

      {/* Gradientes de scrim para legibilidade do texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent sm:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.4)_42%,rgba(0,0,0,0.05)_70%)] sm:block" />

      {/* Conteúdo */}
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

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container, Section } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "@/components/icons";
import { categoryTiles } from "@/lib/products";

export function CategoryTiles() {
  return (
    <Section id="categorias" ariaLabel="Categorias" topPad={false} className="bg-bg transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {categoryTiles.map((tile, i) => (
            <ScrollReveal key={tile.id} direction="up" threshold={0.2} delay={(i % 3) * 100}>
              <motion.a
                href={`/?categoria=${encodeURIComponent(tile.label)}#catalogo`}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative block aspect-[16/10] overflow-hidden rounded-3xl bg-surface sm:aspect-[3/4]"
              >
                <motion.div
                  variants={{
                    rest: { scale: 1, filter: "grayscale(1)" },
                    hover: { scale: 1.04, filter: "grayscale(0)" },
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="text-section text-white">{tile.label}</h3>
                  <p className="text-body mt-1 max-w-xs text-white/80">{tile.description}</p>
                  <motion.span
                    variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-cta mt-4 inline-flex items-center gap-2 text-white"
                  >
                    Ver mais
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

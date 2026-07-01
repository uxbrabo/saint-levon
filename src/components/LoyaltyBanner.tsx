"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container, Section } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WaveText } from "@/components/WaveText";
import { useMagnetic } from "@/hooks/useMagnetic";

const PERKS = ["5% de cashback", "Acesso antecipado", "Descontos exclusivos", "Brindes de aniversário"];

export function LoyaltyBanner() {
  const {
    ref: magneticRef,
    style: magneticStyle,
    onMouseMove: onMagneticMove,
    onMouseLeave: onMagneticLeave,
  } = useMagnetic<HTMLAnchorElement>(0.35);

  return (
    <Section ariaLabel="Clube SAINT LEVON" topPad={false} className="bg-bg transition-colors duration-300">
      <Container>
        <ScrollReveal direction="up" threshold={0.2}>
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
            <div className="group relative aspect-[16/10] lg:aspect-auto">
              <Image
                src="/images/sections/club.jpeg"
                alt="Amigos vestindo SAINT LEVON, rindo em um terraço com vista da cidade"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <WaveText className="text-section text-fg">Entre pro SAINT LEVON Club</WaveText>
              <p className="text-body mt-3 max-w-md text-secondary">
                Ofertas exclusivas, acesso antecipado a lançamentos, bônus personalizados e muito mais.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {PERKS.map((perk) => (
                  <li key={perk} className="text-label text-secondary normal-case tracking-normal">
                    {perk}
                  </li>
                ))}
              </ul>

              <motion.a
                ref={magneticRef}
                href="#carrinho"
                onMouseMove={onMagneticMove}
                onMouseLeave={onMagneticLeave}
                style={magneticStyle}
                whileTap={{ scale: 0.95 }}
                className="text-cta mt-8 inline-flex w-fit items-center justify-center rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity duration-200 hover:opacity-85"
              >
                Tornar-se membro
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container, Section } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WaveText } from "@/components/WaveText";
import { CatalogTile } from "@/components/CatalogTile";
import { StarIcon, SearchIcon } from "@/components/icons";
import { products } from "@/lib/products";

const CATEGORIES = ["Todas categorias", "Streetwear", "Treino", "Praia"];

// Larguras por breakpoint pré-calculadas para somar exatamente o nº de colunas
// da grade em cada ponto (2 / 3 / 4 colunas) — garante zero buracos, sem
// depender de row-span ou grid-auto-flow: dense (que deixam vãos). Largura
// máxima de 2 colunas (nunca 3+) pra manter proporção harmônica com fotos
// de retrato — tile largo demais numa linha baixa cortava o modelo.
const SPAN_PATTERN = [
  "col-span-2 sm:col-span-2 lg:col-span-2",
  "col-span-1 sm:col-span-1 lg:col-span-1",
  "col-span-1 sm:col-span-2 lg:col-span-1",
  "col-span-2 sm:col-span-1 lg:col-span-1",
  "col-span-1 sm:col-span-2 lg:col-span-1",
  "col-span-1 sm:col-span-1 lg:col-span-2",
];

export function ProductCatalog() {
  const searchId = useId();
  const [active, setActive] = useState("Todas categorias");
  const [query, setQuery] = useState("");

  // Lê ?categoria= da URL (definido pelos cards de Categorias) sem quebrar
  // a hidratação — aplica um frame depois do mount, igual ao useMounted.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const categoria = new URLSearchParams(window.location.search).get("categoria");
      if (categoria && CATEGORIES.includes(categoria)) {
        setActive(categoria);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = active === "Todas categorias" || product.category === active;
      const matchesQuery = q === "" || product.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <Section id="catalogo" ariaLabel="Catálogo completo" topPad={false} className="bg-bg transition-colors duration-300">
      <Container>
        <ScrollReveal direction="up" threshold={0.2}>
          <div className="mb-6">
            <span className="text-label text-secondary">Catálogo</span>
            <WaveText className="text-section mt-2 text-fg">Peças</WaveText>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filtrar catálogo por categoria">
              {CATEGORIES.map((category) => {
                const selected = active === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(category)}
                    className={`text-cta relative rounded-full border px-5 py-2.5 transition-colors duration-200 ${
                      selected ? "border-accent text-accent-fg" : "border-line text-fg hover:border-fg"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="active-catalog-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-accent"
                      />
                    )}
                    <span className="relative">{category}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-2.5 sm:w-64">
              <SearchIcon className="h-4 w-4 shrink-0 text-secondary" />
              <label htmlFor={searchId} className="sr-only">
                Buscar no catálogo por nome do produto
              </label>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produto..."
                className="text-body w-full bg-transparent text-fg placeholder:text-secondary"
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid auto-rows-[240px] grid-cols-2 gap-4 sm:auto-rows-[280px] sm:grid-cols-3 lg:auto-rows-[340px] lg:grid-cols-4">
          <motion.div
            layout
            className={`flex flex-col justify-center rounded-3xl bg-accent p-6 text-accent-fg ${SPAN_PATTERN[0]}`}
          >
            <StarIcon className="h-6 w-6 text-accent-fg/70" />
            <p className="font-display mt-3 text-2xl leading-tight">4.9 de nota média</p>
            <p className="text-body mt-2 text-accent-fg/75">
              Entre 10.000+ clientes que já vestem SAINT LEVON.
            </p>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => {
              const isLast = i === filtered.length - 1;
              const isOdd = filtered.length % 2 !== 0;
              // Se for o último e ficar sozinho numa linha incompleta, estica pra preencher
              const span =
                isLast && isOdd
                  ? "col-span-2 sm:col-span-2 lg:col-span-2"
                  : SPAN_PATTERN[(i + 1) % SPAN_PATTERN.length];
              return (
                <CatalogTile
                  key={product.id}
                  product={product}
                  className={span}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-body mt-8 text-secondary">
            Nenhum produto encontrado para essa busca. Tente outro termo ou categoria.
          </p>
        )}
      </Container>
    </Section>
  );
}

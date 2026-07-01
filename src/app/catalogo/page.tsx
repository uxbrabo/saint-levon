"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Container, Section } from "@/components/layout/Container";
import { products, formatPrice, productImage, type Product } from "@/lib/products";
import { SearchIcon, StarIcon } from "@/components/icons";

const CATEGORIES = ["Todos", "Streetwear", "Treino", "Praia"];
const SORT_OPTIONS = ["Relevância", "Menor preço", "Maior preço", "Melhor avaliado"];

const GUIDE = [
  { tamanho: "P", busto: "86–91", cintura: "66–71", quadril: "91–96" },
  { tamanho: "M", busto: "91–96", cintura: "71–76", quadril: "96–101" },
  { tamanho: "G", busto: "96–101", cintura: "76–81", quadril: "101–106" },
  { tamanho: "GG", busto: "101–106", cintura: "81–86", quadril: "106–111" },
];

function ProductTile({ product }: { product: Product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/produto/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
          {product.badge && (
            <span className={`text-label absolute left-3 top-3 z-10 rounded-full px-3 py-1 ${
              product.badge === "novo" ? "bg-white text-[#0a0a0a]" : "bg-[#0a0a0a] text-white"
            }`}>
              {product.badge === "novo" ? "Novidade" : "Oferta"}
            </span>
          )}
          <Image
            src={productImage(product, 600, 800)}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
        </div>
        <div className="mt-4 px-1">
          <p className="text-label text-secondary">{product.category}</p>
          <h3 className="font-display mt-1 text-base font-bold text-fg">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-price text-fg">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1">
              <StarIcon className="h-3 w-3 text-fg" />
              <span className="text-label text-secondary">{product.rating}</span>
            </div>
          </div>
          <p className="text-label mt-2 text-secondary normal-case tracking-normal">
            {product.sizes.join(" · ")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sort, setSort] = useState("Relevância");
  const [query, setQuery] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
      const matchesQuery = query === "" || p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
    if (sort === "Menor preço") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Maior preço") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Melhor avaliado") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, sort, query]);

  return (
    <main>
      <Section ariaLabel="Catálogo completo" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-label text-secondary">Acervo completo</span>
              <h1 className="font-display mt-2 text-4xl font-black uppercase text-fg md:text-5xl">Catálogo</h1>
            </div>
            <button
              type="button"
              onClick={() => setGuideOpen((v) => !v)}
              className="text-cta self-start rounded-full border border-line px-5 py-2.5 text-fg transition-colors hover:border-fg sm:self-auto"
            >
              Tabela de tamanhos
            </button>
          </div>

          {guideOpen && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-line">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-label px-6 py-4 text-secondary">Tamanho</th>
                    <th className="text-label px-6 py-4 text-secondary">Busto (cm)</th>
                    <th className="text-label px-6 py-4 text-secondary">Cintura (cm)</th>
                    <th className="text-label px-6 py-4 text-secondary">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {GUIDE.map((row, i) => (
                    <tr key={row.tamanho} className={i % 2 === 0 ? "bg-bg" : "bg-surface"}>
                      <td className="text-body px-6 py-4 font-semibold text-fg">{row.tamanho}</td>
                      <td className="text-body px-6 py-4 text-secondary">{row.busto}</td>
                      <td className="text-body px-6 py-4 text-secondary">{row.cintura}</td>
                      <td className="text-body px-6 py-4 text-secondary">{row.quadril}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar por categoria">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-cta relative rounded-full border px-5 py-2.5 transition-colors duration-200 ${
                    activeCategory === cat ? "border-accent bg-accent text-accent-fg" : "border-line text-fg hover:border-fg"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 sm:w-52">
                <SearchIcon className="h-4 w-4 shrink-0 text-secondary" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar..."
                  aria-label="Buscar produto"
                  className="text-body w-full bg-transparent text-fg placeholder:text-secondary"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Ordenar por"
                className="text-cta rounded-full border border-line bg-surface px-5 py-2.5 text-fg"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-label text-secondary">
              {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
            </p>
          </div>

          {filtered.length === 0 ? (
            <p className="text-body mt-12 text-secondary">
              Nenhum produto encontrado. Tente outro termo ou categoria.
            </p>
          ) : (
            <motion.div
              layout
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <ProductTile key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <div className="mt-20 rounded-3xl border border-line bg-surface p-8 md:p-12">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Não encontrou o que procurava?</h2>
            <p className="text-body mt-3 text-secondary">
              Novos produtos entram no catálogo mensalmente. Siga o{" "}
              <a href="https://instagram.com/saintlevon" className="text-fg underline underline-offset-4">
                @saintlevon
              </a>{" "}
              pra ser o primeiro a saber.
            </p>
            <a
              href="https://wa.me/5581989056181"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta mt-5 inline-flex rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
            >
              Falar com a gente
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}

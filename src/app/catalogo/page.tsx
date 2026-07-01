"use client";

import { useState, useMemo, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/layout/Container";
import { products, formatPrice, productImage } from "@/lib/products";
import { StarIcon, SearchIcon, ArrowRight } from "@/components/icons";

// ─── Dados auxiliares ───────────────────────────────────────────────
const CATEGORIES = ["Todas", "Streetwear", "Treino", "Praia"];

const SIZES = ["P", "M", "G", "GG", "38", "40", "42", "44", "46", "Único"];

const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevância" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "avaliacao", label: "Melhor avaliado" },
  { value: "novo", label: "Novidades primeiro" },
];

const TABELA_TAMANHOS = [
  { tam: "P", busto: "86–91", cintura: "66–71", quadril: "91–96" },
  { tam: "M", busto: "91–96", cintura: "71–76", quadril: "96–101" },
  { tam: "G", busto: "96–101", cintura: "76–81", quadril: "101–106" },
  { tam: "GG", busto: "101–106", cintura: "81–86", quadril: "106–111" },
];

// ─── Subcomponentes ─────────────────────────────────────────────────
function BadgeChip({ badge }: { badge: "novo" | "sale" }) {
  return (
    <span
      className={`text-label absolute left-3 top-3 z-10 rounded-full px-3 py-1 ${
        badge === "novo" ? "bg-white text-[#0a0a0a]" : "bg-[#0a0a0a] text-white"
      }`}
    >
      {badge === "novo" ? "Novidade" : "Oferta"}
    </span>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/produto/${product.id}`} className="block">
        {/* Imagem */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
          {product.badge && <BadgeChip badge={product.badge} />}
          <Image
            src={productImage(product, 600, 800)}
            alt={product.alt}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 44vw, 90vw"
            className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-fg/90 py-3 transition-transform duration-300 group-hover:translate-y-0">
            <span className="text-cta flex items-center gap-2 text-bg">
              Ver produto <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 px-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-label text-secondary">{product.category}</p>
              <h3 className="font-display mt-0.5 text-base font-bold text-fg">{product.name}</h3>
            </div>
            <div className="flex shrink-0 items-center gap-1 pt-0.5">
              <StarIcon className="h-3 w-3 text-fg" />
              <span className="text-label text-secondary">{product.rating}</span>
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-price text-fg">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-body text-sm text-secondary line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="text-label mt-2 text-secondary normal-case tracking-normal">
            {product.material}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <span
                key={s}
                className="text-label rounded border border-line px-2 py-0.5 normal-case tracking-normal text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Página principal ────────────────────────────────────────────────
export default function CatalogoPage() {
  const searchId = useId();
  const [category, setCategory] = useState("Todas");
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("relevancia");
  const [query, setQuery] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catOk = category === "Todas" || p.category === category;
      const sizeOk = !sizeFilter || p.sizes.includes(sizeFilter);
      const queryOk = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.material.toLowerCase().includes(query.toLowerCase());
      return catOk && sizeOk && queryOk;
    });

    if (sortBy === "preco-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "preco-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "avaliacao") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "novo") list = [...list].sort((a) => (a.badge === "novo" ? -1 : 1));

    return list;
  }, [category, sizeFilter, sortBy, query]);

  const hasFilters = category !== "Todas" || sizeFilter !== null || query !== "";

  return (
    <main className="bg-bg min-h-screen transition-colors duration-300">
      {/* ── Hero do catálogo ── */}
      <div className="relative h-56 overflow-hidden bg-[#0a0a0a] md:h-72">
        <Image
          src="/images/categories/streetwear.jpeg"
          alt="Catálogo SAINT LEVON"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 grayscale"
        />
        <div className="relative z-10 flex h-full flex-col items-start justify-end p-6 pb-8 md:p-12 md:pb-10 lg:px-20">
          <span className="text-label text-white/60">Acervo completo</span>
          <h1 className="font-display mt-2 text-4xl font-black uppercase text-white md:text-6xl">
            Catálogo
          </h1>
          <p className="text-body mt-2 text-white/60">
            {products.length} peças com fotografia e tecnologia SAINT LEVON
          </p>
        </div>
      </div>

      {/* ── Controles: filtros + busca + ordenação ── */}
      <div className="sticky top-20 z-40 border-b border-line bg-bg/95 backdrop-blur-sm transition-colors duration-300">
        <Container>
          <div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-none">
            {/* Pills de categoria */}
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
                className={`text-cta relative shrink-0 rounded-full border px-5 py-2.5 transition-colors duration-200 ${
                  category === cat
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-line text-fg hover:border-fg"
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="mx-2 h-6 w-px shrink-0 bg-line" />

            {/* Busca */}
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 sm:w-52">
              <SearchIcon className="h-4 w-4 text-secondary" />
              <label htmlFor={searchId} className="sr-only">Buscar produto</label>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="text-body w-full bg-transparent text-fg placeholder:text-secondary"
              />
            </div>

            {/* Filtros extras (mobile: toggle) */}
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className={`text-cta shrink-0 rounded-full border px-4 py-2.5 transition-colors duration-200 ${
                showFilters || sizeFilter ? "border-fg bg-fg text-bg" : "border-line text-fg hover:border-fg"
              }`}
            >
              {sizeFilter ? `Tam. ${sizeFilter}` : "Tamanho"}
            </button>

            <div className="ml-auto shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Ordenar por"
                className="text-cta rounded-full border border-line bg-surface px-4 py-2.5 text-fg"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Painel de tamanhos */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-line"
              >
                <div className="flex flex-wrap gap-2 py-4">
                  <button
                    type="button"
                    onClick={() => setSizeFilter(null)}
                    className={`text-cta rounded-full border px-4 py-2 transition-colors duration-200 ${
                      !sizeFilter ? "border-fg bg-fg text-bg" : "border-line text-fg hover:border-fg"
                    }`}
                  >
                    Todos
                  </button>
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSizeFilter(sizeFilter === s ? null : s)}
                      className={`text-cta rounded-full border px-4 py-2 transition-colors duration-200 ${
                        sizeFilter === s ? "border-fg bg-fg text-bg" : "border-line text-fg hover:border-fg"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>

      {/* ── Corpo do catálogo ── */}
      <Container className="py-10">
        {/* Barra de status */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="text-label text-secondary">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
            {hasFilters && " encontrados"}
          </p>
          <div className="flex items-center gap-3">
            {hasFilters && (
              <button
                type="button"
                onClick={() => { setCategory("Todas"); setSizeFilter(null); setQuery(""); }}
                className="text-label text-secondary underline underline-offset-4 hover:text-fg transition-colors"
              >
                Limpar filtros
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowGuide((v) => !v)}
              className="text-label text-fg underline underline-offset-4 hover:text-secondary transition-colors"
            >
              Tabela de tamanhos
            </button>
          </div>
        </div>

        {/* Tabela de tamanhos */}
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-10 overflow-hidden"
            >
              <div className="overflow-x-auto rounded-2xl border border-line">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface">
                      {["Tamanho", "Busto (cm)", "Cintura (cm)", "Quadril (cm)"].map((h) => (
                        <th key={h} className="text-label px-6 py-4 text-secondary">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABELA_TAMANHOS.map((row, i) => (
                      <tr key={row.tam} className={i % 2 === 0 ? "bg-bg" : "bg-surface"}>
                        <td className="text-body px-6 py-4 font-bold text-fg">{row.tam}</td>
                        <td className="text-body px-6 py-4 text-secondary">{row.busto}</td>
                        <td className="text-body px-6 py-4 text-secondary">{row.cintura}</td>
                        <td className="text-body px-6 py-4 text-secondary">{row.quadril}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-label mt-3 text-secondary normal-case tracking-normal">
                Em dúvida entre dois tamanhos? Para surf e treino, escolha o maior. Para streetwear, prefira o menor.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid de produtos */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-section text-fg">Sem resultados</p>
            <p className="text-body mt-4 max-w-sm text-secondary">
              Nenhum produto encontrado com esses filtros. Tente uma combinação diferente ou{" "}
              <button
                type="button"
                onClick={() => { setCategory("Todas"); setSizeFilter(null); setQuery(""); }}
                className="underline underline-offset-4"
              >
                limpe os filtros
              </button>
              .
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Seções por categoria ── */}
        {!hasFilters && (
          <div className="mt-24 flex flex-col gap-20">
            {["Streetwear", "Treino", "Praia"].map((cat) => {
              const catProducts = products.filter((p) => p.category === cat);
              if (!catProducts.length) return null;
              return (
                <section key={cat} aria-label={`Categoria ${cat}`}>
                  <div className="flex items-end justify-between gap-4">
                    <h2 className="font-display text-2xl font-black uppercase text-fg md:text-3xl">
                      {cat}
                    </h2>
                    <button
                      type="button"
                      onClick={() => { setCategory(cat); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="text-label text-secondary underline underline-offset-4 hover:text-fg transition-colors"
                    >
                      Ver só {cat}
                    </button>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                    {catProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* ── Rodapé do catálogo ── */}
        <div className="mt-24 rounded-3xl border border-line bg-surface p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-fg">Novidades mensais</h3>
              <p className="text-body mt-3 text-secondary">
                Novas peças entram no catálogo todo mês. Siga o Instagram pra ser o primeiro a saber.
              </p>
              <a
                href="https://instagram.com/saintlevon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta mt-4 inline-flex rounded-full border border-line px-5 py-2.5 text-fg transition-colors hover:border-fg"
              >
                @saintlevon
              </a>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-fg">Dúvida sobre tamanho?</h3>
              <p className="text-body mt-3 text-secondary">
                Manda uma mensagem com suas medidas — te ajudamos a escolher o tamanho certo.
              </p>
              <a
                href="https://wa.me/5581989056181"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta mt-4 inline-flex rounded-full bg-accent px-5 py-2.5 text-accent-fg transition-opacity hover:opacity-85"
              >
                WhatsApp
              </a>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-fg">Frete grátis</h3>
              <p className="text-body mt-3 text-secondary">
                Em todas as compras acima de R$ 350. Entrega para todo o Brasil via Correios.
              </p>
              <Link
                href="/entrega"
                className="text-cta mt-4 inline-flex rounded-full border border-line px-5 py-2.5 text-fg transition-colors hover:border-fg"
              >
                Ver políticas de entrega
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
